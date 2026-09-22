import { useCallback, useEffect, useState } from 'react';

import { StateNotice } from '@/components';
import { mockTechTags, ProfileForm } from '@/features/profile';
import { toast, type ApiError } from '@/lib';
import type { ProfileRequest, ProfileResponse } from '@/types/profile';

import { mockGetProfile, mockUpdateProfile } from './mockMyProfile';
import * as S from './MyPage.styles';

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'done'; profile: ProfileResponse };

const techTagName = (id: number) => mockTechTags.find((tag) => tag.techTagId === id)?.name ?? '';

// 마이페이지 (F8). API 연동 전이라 조회 · 저장 · 기술 목록은 목업이다.
export default function MyPage() {
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  const load = useCallback(() => {
    setState({ status: 'loading' });
    mockGetProfile()
      .then((profile) => setState({ status: 'done', profile }))
      .catch((error: ApiError) => setState({ status: 'error', message: error.message }));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (request: ProfileRequest) => {
    await mockUpdateProfile(request, techTagName);
    toast.success('내 정보를 저장했어요');
  };

  const renderContent = () => {
    if (state.status === 'loading')
      return <StateNotice tone="loading" title="내 정보를 불러오고 있어요" bare />;

    if (state.status === 'error')
      return (
        <StateNotice
          tone="error"
          title="내 정보를 불러오지 못했어요"
          description={state.message}
          action={{ label: '다시 시도', onClick: load }}
        />
      );

    const { profile } = state;
    return (
      <ProfileForm
        variant="settings"
        name={profile.name}
        techTags={mockTechTags}
        initialValues={{
          jobFields: profile.jobFields,
          careerYears: profile.careerYears,
          haveSkillIds: profile.haveSkills.map((skill) => skill.techTagId),
          wantSkillIds: profile.wantSkills.map((skill) => skill.techTagId),
        }}
        submitLabel="저장"
        onSubmit={handleSubmit}
      />
    );
  };

  return (
    <S.Container>
      <S.Title>내 정보</S.Title>
      <S.Description>바꾸면 기업 추천 순서와 AI 가이드가 다시 계산됩니다</S.Description>
      {renderContent()}
    </S.Container>
  );
}
