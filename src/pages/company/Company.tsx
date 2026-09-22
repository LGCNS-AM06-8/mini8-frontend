import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import StatBlogIcon from '@/assets/icons/stat-blog.svg?react';
import StatSkillIcon from '@/assets/icons/stat-skill.svg?react';
import StatSourceIcon from '@/assets/icons/stat-source.svg?react';
import StatTopicIcon from '@/assets/icons/stat-topic.svg?react';
import { ArticleCard, BackButton, Button, Dropdown, Toggle } from '@/components';
import type { ArticleCardPost, DropdownOption } from '@/components';
import { PATHS } from '@/constants/paths';
import type { NameCount } from '@/types/company';

import * as S from './Company.styles';
import { mockGetCompanyDetail, mockGetCompanyPosts } from './mockCompany';

type SortOrder = 'relevance' | 'latest';

// 관련도순 = 서버가 준 순서(관심 기술 겹침 수 → 최신순) 그대로
const SORT_OPTIONS: DropdownOption<SortOrder>[] = [
  { value: 'relevance', label: '관련도순' },
  { value: 'latest', label: '최신순' },
];

const formatCounts = (items: NameCount[]) =>
  items.map(({ name, count }) => `${name} ${count}`).join(' · ');

// 기업 상세 (F5). API 연동 전이라 mockCompany 로 화면만 구성한다.
export default function Company() {
  const navigate = useNavigate();
  const { companyId: companyIdParam } = useParams();
  const companyId = Number(companyIdParam);

  // 티켓: 「내 관심 기술만」 토글 기본 ON
  const [onlyMySkills, setOnlyMySkills] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortOrder>('relevance');
  // 서버 응답을 다시 받기 전까지 저장 버튼 결과를 화면에 먼저 반영한다.
  const [bookmarkOverrides, setBookmarkOverrides] = useState<Record<number, boolean>>({});

  const company = useMemo(() => mockGetCompanyDetail(companyId), [companyId]);
  const { filter, posts } = useMemo(
    () => mockGetCompanyPosts(companyId, onlyMySkills),
    [companyId, onlyMySkills],
  );

  const sortedPosts = useMemo(
    () =>
      sortOrder === 'latest'
        ? [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
        : posts,
    [posts, sortOrder],
  );

  const handleBookmarkToggle = (post: ArticleCardPost) => {
    const next = !post.bookmarked;
    setBookmarkOverrides((prev) => ({ ...prev, [post.postId]: next }));
    console.info(`[mock] ${next ? 'POST' : 'DELETE'} /api/bookmarks/${post.postId}`);
  };

  if (!company) {
    return (
      <S.Container>
        <S.Notice>
          <S.NoticeTitle>찾을 수 없는 기업이에요</S.NoticeTitle>
          <S.NoticeDescription>
            주소가 바뀌었거나 목록에서 빠진 기업일 수 있어요.
          </S.NoticeDescription>
          <Button variant="soft" onClick={() => navigate(PATHS.HOME)}>
            기업 목록으로
          </Button>
        </S.Notice>
      </S.Container>
    );
  }

  const { name, summary, mainBusiness, sourceUrl, checkedAt, stats } = company;
  const intro = [summary, mainBusiness].filter(Boolean).join('   ·   ');
  const source = [
    sourceUrl && (
      <a key="url" href={sourceUrl} target="_blank" rel="noopener noreferrer">
        {sourceUrl.replace(/^https?:\/\//, '')}
      </a>
    ),
    checkedAt && `${checkedAt} 확인`,
  ].filter(Boolean);

  return (
    <S.Container>
      <S.Top>
        <BackButton />
        <S.InfoCard>
          <S.CompanyHeader>
            {/* 로고 출처(서버 logoUrl / 프론트 assets)가 정해지기 전까지 빈 칸으로 둔다 */}
            <S.Logo />
            <S.NameBlock>
              <S.Name>{name}</S.Name>
              {intro && <S.Intro>{intro}</S.Intro>}
            </S.NameBlock>
          </S.CompanyHeader>
          <S.Divider />
          <S.StatList>
            <S.StatRow>
              <S.StatIconBox>
                <StatTopicIcon aria-hidden />
              </S.StatIconBox>
              <S.StatLabel>주로 다루는 주제</S.StatLabel>
              <S.StatValue>{formatCounts(stats.topCategories)}</S.StatValue>
            </S.StatRow>
            <S.StatRow>
              <S.StatIconBox>
                <StatSkillIcon aria-hidden />
              </S.StatIconBox>
              <S.StatLabel>자주 나오는 기술</S.StatLabel>
              <S.StatValue>{formatCounts(stats.topSkills)}</S.StatValue>
            </S.StatRow>
            <S.StatRow>
              <S.StatIconBox>
                <StatBlogIcon aria-hidden />
              </S.StatIconBox>
              <S.StatLabel>블로그</S.StatLabel>
              <S.StatValue>
                {stats.postCount}편 · {stats.firstPublishedAt} ~ {stats.lastPublishedAt}
              </S.StatValue>
            </S.StatRow>
            {source.length > 0 && (
              <S.StatRow>
                <S.StatIconBox>
                  <StatSourceIcon aria-hidden />
                </S.StatIconBox>
                <S.StatLabel>출처 · 확인일</S.StatLabel>
                <S.StatValue>
                  {source.map((item, index) => (
                    <span key={index}>
                      {index > 0 && '  ·  '}
                      {item}
                    </span>
                  ))}
                </S.StatValue>
              </S.StatRow>
            )}
          </S.StatList>
        </S.InfoCard>
      </S.Top>

      <S.Controls>
        <S.ToggleGroup>
          <S.ToggleLabel id="only-my-skills-label">내 관심 기술만</S.ToggleLabel>
          <S.ToggleCount>{filter.matchedCount}편</S.ToggleCount>
          <Toggle
            checked={onlyMySkills}
            onChange={setOnlyMySkills}
            aria-labelledby="only-my-skills-label"
          />
        </S.ToggleGroup>
        <Dropdown
          options={SORT_OPTIONS}
          value={sortOrder}
          onChange={setSortOrder}
          aria-label="정렬"
        />
      </S.Controls>

      {sortedPosts.length > 0 ? (
        <S.PostList>
          {sortedPosts.map((post) => (
            <li key={post.postId}>
              <ArticleCard
                companyId={companyId}
                companyName={name}
                post={{ ...post, bookmarked: bookmarkOverrides[post.postId] ?? post.bookmarked }}
                onBookmarkToggle={handleBookmarkToggle}
              />
            </li>
          ))}
        </S.PostList>
      ) : onlyMySkills && filter.totalCount > 0 ? (
        // 명세: 관심 기술 글이 0편이면 서버는 빈 목록을 주고, 화면이 전체 글 보기를 안내한다.
        <S.Notice>
          <S.NoticeTitle>이 기업에는 관심 기술을 다룬 글이 아직 없어요</S.NoticeTitle>
          <S.NoticeDescription>
            토글을 끄면 이 기업의 전체 글 {filter.totalCount}편을 최신순으로 볼 수 있어요.
          </S.NoticeDescription>
          <Button variant="soft" onClick={() => setOnlyMySkills(false)}>
            전체 글 보기
          </Button>
        </S.Notice>
      ) : (
        <S.Notice>
          <S.NoticeTitle>아직 수집된 글이 없어요</S.NoticeTitle>
        </S.Notice>
      )}
    </S.Container>
  );
}
