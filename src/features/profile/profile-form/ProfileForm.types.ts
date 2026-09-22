import type { ProfileRequest, TechTag } from '@/types/profile';

export type ProfileField = keyof ProfileRequest;

export type ProfileErrors = Partial<Record<ProfileField, string>>;

// onboarding: F3(/userInput) 카드 안 한 줄 폼 · settings: F8(/myPage) 흰 상자 + 오른쪽 아래 저장/취소
export type ProfileFormVariant = 'onboarding' | 'settings';

// 서버 조회값은 경력이 null(미입력)일 수 있다
export type ProfileFormInitialValues = Omit<ProfileRequest, 'careerYears'> & {
  careerYears: number | null;
};

// F3(/userInput) 과 F8(/myPage) 이 같이 쓴다. 저장 API 만 다르다.
export interface ProfileFormProps {
  techTags: TechTag[];
  initialValues?: ProfileFormInitialValues;
  submitLabel: string;
  variant?: ProfileFormVariant;
  // settings 에서 이름 칸에 보여 줄 값 (구글 계정 이름이라 고칠 수 없다)
  name?: string;
  // 실패하면 ApiError 를 던진다. field 가 있으면 그 칸으로 이동한다
  onSubmit: (request: ProfileRequest) => Promise<void>;
}
