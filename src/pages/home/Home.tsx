import { useCallback, useEffect, useState } from 'react';

import { CompanyListCard, StateNotice } from '@/components';
import type { ApiError } from '@/lib';
import { getProfile } from '@/services/profile';
import type { ProfileResponse } from '@/types/profile';

import * as S from './Home.styles';
import { mockCompanies } from './mockCompanies';

type ProfileState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'done'; profile: ProfileResponse };

// 기업 목록 (F4). 상단 이름 · 관심 기술은 GET /api/profile 에서 받고,
// 기업 카드는 GET /api/companies(준우님 S6)가 생길 때까지 목업이다.
export default function Home() {
  const [state, setState] = useState<ProfileState>({ status: 'loading' });

  const load = useCallback(() => {
    setState({ status: 'loading' });
    getProfile()
      .then((profile) => setState({ status: 'done', profile }))
      .catch((error: ApiError) => setState({ status: 'error', message: error.message }));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (state.status === 'loading')
    return (
      <S.Container>
        <StateNotice tone="loading" title="기업 목록을 준비하고 있어요" bare />
      </S.Container>
    );

  if (state.status === 'error')
    return (
      <S.Container>
        <StateNotice
          tone="error"
          title="기업 목록을 불러오지 못했어요"
          description={state.message}
          action={{ label: '다시 시도', onClick: load }}
        />
      </S.Container>
    );

  const { name, wantSkills } = state.profile;
  const interestSkills = wantSkills.map((skill) => skill.name);

  return (
    <S.Container>
      <S.Heading>
        <S.Title>{name}님, 이런 기업 블로그 주목해보세요</S.Title>
        <S.Subtitle>더 알아보고 싶은 기술을 중심으로 기업을 추렸어요.</S.Subtitle>
      </S.Heading>
      <S.List>
        {mockCompanies.map((company) => (
          <li key={company.companyId}>
            <CompanyListCard company={company} interestSkills={interestSkills} />
          </li>
        ))}
      </S.List>
    </S.Container>
  );
}
