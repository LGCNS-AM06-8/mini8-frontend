import type { ProfileRequest, TechTag } from '@/types/profile';

export type ProfileField = keyof ProfileRequest;

export type ProfileErrors = Partial<Record<ProfileField, string>>;

// F3(/userInput) 과 F8(/myPage) 이 같이 쓴다. 저장 API 만 다르다.
export interface ProfileFormProps {
  techTags: TechTag[];
  initialValues?: ProfileRequest;
  submitLabel: string;
  // 실패하면 ApiError 를 던진다. field 가 있으면 그 칸으로 이동한다
  onSubmit: (request: ProfileRequest) => Promise<void>;
}
