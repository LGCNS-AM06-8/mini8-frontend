import { useCallback, useRef, useState, type FormEvent } from 'react';

import { Tag } from '@/components';
import type { ApiError } from '@/lib';
import type { JobField } from '@/types/profile';

import { JOB_FIELD_OPTIONS, WANT_SKILL_MAX } from '../constants';
import TechSelectModal from '../tech-select-modal/TechSelectModal';
import * as S from './ProfileForm.styles';
import type { ProfileErrors, ProfileField, ProfileFormProps } from './ProfileForm.types';

type SkillField = 'haveSkillIds' | 'wantSkillIds';

const SKILL_LABELS: Record<SkillField, string> = {
  haveSkillIds: '보유 기술',
  wantSkillIds: '더 알아보고 싶은 기술',
};

// 화면에 보이는 순서. 오류가 여러 개면 가장 위 칸으로 이동한다
const FIELD_ORDER: ProfileField[] = ['jobFields', 'careerYears', 'haveSkillIds', 'wantSkillIds'];

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

export default function ProfileForm({
  techTags,
  initialValues,
  submitLabel,
  onSubmit,
}: ProfileFormProps) {
  const [values, setValues] = useState<FormValues>({
    jobFields: initialValues?.jobFields ?? [],
    careerYears: initialValues ? String(initialValues.careerYears) : '',
    haveSkillIds: initialValues?.haveSkillIds ?? [],
    wantSkillIds: initialValues?.wantSkillIds ?? [],
  });
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [modalTarget, setModalTarget] = useState<SkillField | null>(null);
  const fieldRefs = useRef<Partial<Record<ProfileField, HTMLDivElement | null>>>({});

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setFormError(null);

    const nextErrors = validate(values);
    const firstError = FIELD_ORDER.find((field) => nextErrors[field]);
    setErrors(nextErrors);
    if (firstError) {
      moveTo(firstError);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ ...values, careerYears: Number(values.careerYears) });
    } catch (error) {
      // 입력값은 그대로 두고, 서버가 가리킨 칸이 있으면 그 칸에 오류를 띄운다
      const { field, message } = error as ApiError;
      if (field && FIELD_ORDER.includes(field as ProfileField)) {
        setErrors({ [field]: message });
        moveTo(field as ProfileField);
      } else {
        setFormError(message);
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

  return (
    <S.Form onSubmit={handleSubmit} noValidate>
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

      {renderSkillField('haveSkillIds')}
      {renderSkillField('wantSkillIds')}

      {formError && <S.ErrorText role="alert">{formError}</S.ErrorText>}
      <S.SubmitButton type="submit" disabled={submitting}>
        {submitting ? '저장하는 중…' : submitLabel}
      </S.SubmitButton>

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
    </S.Form>
  );
}
