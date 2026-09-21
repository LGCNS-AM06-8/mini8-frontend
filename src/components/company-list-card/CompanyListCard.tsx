import { Hashtag } from '@/components/hashtag';
import { toCompany } from '@/constants/paths';

import * as S from './CompanyListCard.styles';
import type { CompanyListCardProps } from './CompanyListCard.types';

export default function CompanyListCard({
  company,
  interestSkills,
  logoUrl,
}: CompanyListCardProps) {
  const { companyId, name, recommended, matchedSkillCount, totalSkillCount, matchedPostCount } =
    company;

  return (
    <S.Card to={toCompany(String(companyId))}>
      <S.Logo>{logoUrl && <img src={logoUrl} alt="" />}</S.Logo>
      <S.Body>
        <S.TitleRow>
          <S.Name>{name}</S.Name>
          {recommended && <S.RecommendBadge aria-label="추천" />}
        </S.TitleRow>
        <S.Description>
          관심 기술({interestSkills.join('·')}) {totalSkillCount}개 중 {matchedSkillCount}개를 다룬
          글이 있어요 · {matchedPostCount}편
        </S.Description>
        <S.Tags>
          {company.matchedSkills.map((skill) => (
            <Hashtag key={skill.name} variant="tech">
              {skill.name}
            </Hashtag>
          ))}
        </S.Tags>
      </S.Body>
      <S.ChevronWrap>
        <S.Chevron aria-hidden />
      </S.ChevronWrap>
    </S.Card>
  );
}
