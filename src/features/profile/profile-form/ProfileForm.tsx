import { useCallback, useRef, useState, type FormEvent } from 'react';
import { useBlocker } from 'react-router-dom';

import { Button, Tag, WarningModal } from '@/components';
import { showErrorToast, toast, type ApiError } from '@/lib';
import type { JobField } from '@/types/profile';

import { JOB_FIELD_OPTIONS, WANT_SKILL_MAX } from '../constants';
import TechSelectModal from '../tech-select-modal/TechSelectModal';
import * as S from './ProfileForm.styles';
import type {
  ProfileErrors,
  ProfileField,
  ProfileFormInitialValues,
  ProfileFormProps,
  ProfileFormVariant,
} from './ProfileForm.types';

type SkillField = 'haveSkillIds' | 'wantSkillIds';

const SKILL_LABELS: Record<SkillField, string> = {
  haveSkillIds: '보유 기술',
  wantSkillIds: '더 알아보고 싶은 기술',
};

// 화면에 보이는 순서. 오류가 여러 개면 가장 위 칸으로 이동한다 (마이페이지는 경력이 이름 옆 첫 줄)
const FIELD_ORDER: Record<ProfileFormVariant, ProfileField[]> = {
  onboarding: ['jobFields', 'careerYears', 'haveSkillIds', 'wantSkillIds'],
  settings: ['careerYears', 'jobFields', 'haveSkillIds', 'wantSkillIds'],
};

interface FormValues {
  jobFields: JobField[];
  careerYears: string;
  haveSkillIds: number[];
  wantSkillIds: number[];
}

const validate = (values: FormValues): ProfileErrors => {
  const errors: ProfileErrors = {};
  if (values.jobFields.length === 0) errors.jobFields = '희망 직무를 1개 이상 골라 주세요.';
  if (!/^\d+$/.test(values.careerYears))
    errors.careerYears = '경력 년수를 0 이상의 숫자로 입력해 주세요.';
  if (values.wantSkillIds.length === 0)
    errors.wantSkillIds = '더 알아보고 싶은 기술을 1개 이상 골라 주세요.';
  else if (values.wantSkillIds.length > WANT_SKILL_MAX)
    errors.wantSkillIds = `더 알아보고 싶은 기술은 최대 ${WANT_SKILL_MAX}개까지 고를 수 있어요.`;
  return errors;
};

const toFormValues = (initialValues?: ProfileFormInitialValues): FormValues => ({
  jobFields: initialValues?.jobFields ?? [],
  careerYears: initialValues?.careerYears == null ? '' : String(initialValues.careerYears),
  haveSkillIds: initialValues?.haveSkillIds ?? [],
  wantSkillIds: initialValues?.wantSkillIds ?? [],
});

export default function ProfileForm({
  techTags,
  initialValues,
  submitLabel,
  variant = 'onboarding',
  name,
  onSubmit,
}: ProfileFormProps) {
  const [values, setValues] = useState<FormValues>(() => toFormValues(initialValues));
  // 취소하면 돌아갈 값. 저장에 성공하면 저장한 값으로 바뀐다
  const [savedValues, setSavedValues] = useState<FormValues>(values);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [modalTarget, setModalTarget] = useState<SkillField | null>(null);
  const fieldRefs = useRef<Partial<Record<ProfileField, HTMLDivElement | null>>>({});
  const fieldOrder = FIELD_ORDER[variant];
  const isDirty = JSON.stringify(values) !== JSON.stringify(savedValues);

  // settings(마이페이지)에서 저장하지 않고 다른 페이지로 이동하려 하면 경고 모달을 띄운다
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      variant === 'settings' && isDirty && currentLocation.pathname !== nextLocation.pathname,
  );

  const tagName = (id: number) => techTags.find((tag) => tag.techTagId === id)?.name ?? '';

  const update = <K extends keyof FormValues>(
    field: K,
    next: (prev: FormValues[K]) => FormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: next(prev[field]) }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const moveTo = (field: ProfileField) => {
    const element = fieldRefs.current[field];
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element?.querySelector<HTMLElement>('input, button')?.focus({ preventScroll: true });
  };

  const toggleJobField = (jobField: JobField) =>
    update('jobFields', (prev) =>
      prev.includes(jobField) ? prev.filter((v) => v !== jobField) : [...prev, jobField],
    );

  const closeModal = useCallback(() => setModalTarget(null), []);

  const handleCancel = () => {
    setValues(savedValues);
    setErrors({});
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    // 값이 같아도 저장하면 서버가 profileVersion 을 올려 AI 가이드를 다시 만들게 되므로 부르지 않는다
    if (variant === 'settings' && !isDirty) {
      toast('바뀐 내용이 없어요', { id: 'profile-not-changed' });
      return;
    }

    const nextErrors = validate(values);
    const firstError = fieldOrder.find((field) => nextErrors[field]);
    setErrors(nextErrors);
    if (firstError) {
      moveTo(firstError);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ ...values, careerYears: Number(values.careerYears) });
      setSavedValues(values);
    } catch (error) {
      // 입력값은 그대로 두고, 서버가 가리킨 칸이 있으면 그 칸에 오류를 띄운다
      const { field, message } = error as ApiError;
      if (field && fieldOrder.includes(field as ProfileField)) {
        setErrors({ [field]: message });
        moveTo(field as ProfileField);
      } else {
        // 가리킨 칸이 없는 오류(서버 오류 등)는 토스트로 알린다 (F9)
        showErrorToast(error as ApiError);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const renderSkillField = (field: SkillField) => (
    <S.Field ref={(element) => void (fieldRefs.current[field] = element)}>
      <S.Label as="p">{SKILL_LABELS[field]}</S.Label>
      <S.Chips>
        {values[field].map((id) => (
          <Tag
            key={id}
            variant="removable"
            aria-label={`${tagName(id)} 삭제`}
            onClick={() => update(field, (prev) => prev.filter((v) => v !== id))}
          >
            {tagName(id)}
          </Tag>
        ))}
        <S.AddButton type="button" onClick={() => setModalTarget(field)}>
          + 기술 추가
        </S.AddButton>
      </S.Chips>
      {errors[field] && <S.ErrorText role="alert">{errors[field]}</S.ErrorText>}
    </S.Field>
  );

  const jobField = (
    <S.Field ref={(element) => void (fieldRefs.current.jobFields = element)}>
      <S.Label as="p">희망 직무</S.Label>
      <S.Chips>
        {JOB_FIELD_OPTIONS.map(({ value, label }) => (
          <Tag
            key={value}
            selected={values.jobFields.includes(value)}
            onClick={() => toggleJobField(value)}
          >
            {label}
          </Tag>
        ))}
      </S.Chips>
      {errors.jobFields && <S.ErrorText role="alert">{errors.jobFields}</S.ErrorText>}
    </S.Field>
  );

  const careerField = (
    <S.Field ref={(element) => void (fieldRefs.current.careerYears = element)}>
      <S.Label htmlFor="careerYears">경력 년수</S.Label>
      <S.CareerInput
        id="careerYears"
        inputMode="numeric"
        placeholder="0 (신입)"
        value={values.careerYears}
        onChange={(event) => update('careerYears', () => event.target.value.replace(/\D/g, ''))}
      />
      {errors.careerYears && <S.ErrorText role="alert">{errors.careerYears}</S.ErrorText>}
    </S.Field>
  );

  return (
    <S.Form onSubmit={handleSubmit} noValidate $variant={variant}>
      {variant === 'settings' ? (
        <>
          <S.Card>
            <S.Row>
              <S.NameField>
                <S.Label as="p">이름</S.Label>
                <S.ReadOnlyBox>{name}</S.ReadOnlyBox>
              </S.NameField>
              {careerField}
            </S.Row>
            {jobField}
            {renderSkillField('haveSkillIds')}
            {renderSkillField('wantSkillIds')}
          </S.Card>
          <S.Actions>
            <Button type="submit" loading={submitting}>
              {submitLabel}
            </Button>
            <Button variant="secondary" onClick={handleCancel} disabled={submitting}>
              취소
            </Button>
          </S.Actions>
        </>
      ) : (
        <>
          {jobField}
          {careerField}
          {renderSkillField('haveSkillIds')}
          {renderSkillField('wantSkillIds')}
          <S.SubmitButton type="submit" loading={submitting}>
            {submitLabel}
          </S.SubmitButton>
        </>
      )}

      {modalTarget && (
        <TechSelectModal
          targetLabel={SKILL_LABELS[modalTarget]}
          techTags={techTags}
          selectedIds={values[modalTarget]}
          blockedIds={values[modalTarget === 'haveSkillIds' ? 'wantSkillIds' : 'haveSkillIds']}
          max={modalTarget === 'wantSkillIds' ? WANT_SKILL_MAX : undefined}
          onConfirm={(ids) => {
            update(modalTarget, () => ids);
            closeModal();
          }}
          onClose={closeModal}
        />
      )}

      {blocker.state === 'blocked' && (
        <WarningModal
          title="저장하지 않은 변경사항이 있어요"
          description="지금 나가면 변경한 내용이 사라져요."
          confirmLabel="나가기"
          onCancel={() => blocker.reset()}
          onConfirm={() => blocker.proceed()}
        />
      )}
    </S.Form>
  );
}
