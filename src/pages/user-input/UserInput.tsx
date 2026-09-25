import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GradientCard, StateNotice } from '@/components';
import { PATHS } from '@/constants/paths';
import { ProfileForm } from '@/features/profile';
import type { ApiError } from '@/lib';
import { getTechTags } from '@/services/techTags';
import type { ProfileRequest, TechTag } from '@/types/profile';

import { mockSaveProfile } from './mockProfile';
import * as S from './UserInput.styles';

type TechTagsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'done'; techTags: TechTag[] };

// 기본정보 입력 (F3). 기술 목록은 서버에서 받고, 저장은 POST /api/profile 이 생길 때까지 목업이다.
export default function UserInput() {
  const navigate = useNavigate();
  const [state, setState] = useState<TechTagsState>({ status: 'loading' });

  const load = useCallback(() => {
    setState({ status: 'loading' });
    getTechTags()
      .then((techTags) => setState({ status: 'done', techTags }))
      .catch((error: ApiError) => setState({ status: 'error', message: error.message }));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (request: ProfileRequest) => {
    await mockSaveProfile(request);
    navigate(PATHS.HOME, { replace: true });
  };

  const renderForm = () => {
    if (state.status === 'loading')
      return <StateNotice tone="loading" title="기술 목록을 불러오고 있어요" bare />;

    if (state.status === 'error')
      return (
        <StateNotice
          tone="error"
          title="기술 목록을 불러오지 못했어요"
          description={state.message}
          action={{ label: '다시 시도', onClick: load }}
        />
      );

    return (
      <ProfileForm
        techTags={state.techTags}
        submitLabel="저장하고 시작하기"
        onSubmit={handleSubmit}
      />
    );
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
        {renderForm()}
      </S.Content>
    </GradientCard>
  );
}
