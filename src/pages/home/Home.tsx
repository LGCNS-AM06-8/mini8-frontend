import { useCallback, useEffect, useState } from 'react';

import { CompanyListCard, StateNotice } from '@/components';
import type { ApiError } from '@/lib';
import { getCompanies } from '@/services/company';
import { getProfile } from '@/services/profile';
import type { CompanySummary } from '@/types/company';
import type { ProfileResponse } from '@/types/profile';

import * as S from './Home.styles';

type ProfileState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'done'; profile: ProfileResponse; companies: CompanySummary[] };

// 기업 목록 (F4). 상단 이름 · 관심 기술은 GET /api/profile, 기업 카드는 GET /api/companies 에서 받는다.
// 순서는 서버가 정해 주므로 받은 그대로 그린다.
export default function Home() {
  const [state, setState] = useState<ProfileState>({ status: 'loading' });

  const load = useCallback(() => {
    setState({ status: 'loading' });
    Promise.all([getProfile(), getCompanies()])
      .then(([profile, companies]) => setState({ status: 'done', profile, companies }))
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

  const { companies } = state;
  const { name, wantSkills } = state.profile;
  const interestSkills = wantSkills.map((skill) => skill.name);

  return (
    <S.Container>
      <S.Heading>
        <S.Title>{name}님, 이런 기업 블로그 주목해보세요</S.Title>
        <S.Subtitle>더 알아보고 싶은 기술을 중심으로 기업을 추렸어요.</S.Subtitle>
      </S.Heading>
      <S.List>
        {companies.map((company) => (
          <li key={company.companyId}>
            <CompanyListCard company={company} interestSkills={interestSkills} />
          </li>
        ))}
      </S.List>
    </S.Container>
  );
}
