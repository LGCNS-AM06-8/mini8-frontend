import { CompanyListCard } from '@/components';

import * as S from './Home.styles';
import { mockCompanies, mockUser } from './mockCompanies';

// 기업 목록 (F4). API 연동 전이라 mockCompanies 로 화면만 구성한다.
export default function Home() {
  return (
    <S.Container>
      <S.Heading>
        <S.Title>{mockUser.name}님, 이런 기업 블로그 주목해보세요</S.Title>
        <S.Subtitle>더 알아보고 싶은 기술을 중심으로 기업을 추렸어요.</S.Subtitle>
      </S.Heading>
      <S.List>
        {mockCompanies.map((company) => (
          <li key={company.companyId}>
            <CompanyListCard company={company} interestSkills={mockUser.wantSkills} />
          </li>
        ))}
      </S.List>
    </S.Container>
  );
}
