import { useNavigate } from 'react-router-dom';

import { GradientCard } from '@/components';
import { PATHS } from '@/constants/paths';
import { mockTechTags, ProfileForm } from '@/features/profile';
import type { ProfileRequest } from '@/types/profile';

import { mockSaveProfile } from './mockProfile';
import * as S from './UserInput.styles';

// 기본정보 입력 (F3). API 연동 전이라 기술 목록 · 저장은 목업이다.
export default function UserInput() {
  const navigate = useNavigate();

  const handleSubmit = async (request: ProfileRequest) => {
    await mockSaveProfile(request);
    navigate(PATHS.HOME, { replace: true });
  };

  return (
    <GradientCard>
      <S.Content>
        <S.Sigil aria-hidden />
        <S.Title>내 정보 입력</S.Title>
        <S.Description>
          맞춤 큐레이션을 위해 사용자님의 정보가 필요해요! 지금 작성한 내용은 이후
          &lt;마이페이지&gt;를 통해 수정할 수 있어요
        </S.Description>
        <ProfileForm
          techTags={mockTechTags}
          submitLabel="저장하고 시작하기"
          onSubmit={handleSubmit}
        />
      </S.Content>
    </GradientCard>
  );
}
