import { useNavigate } from 'react-router-dom';

import { BookmarkButton } from '@/components/bookmark-button';
import { Button } from '@/components/button';
import { Hashtag } from '@/components/hashtag';
import { toBlog } from '@/constants/paths';

import * as S from './ArticleCard.styles';
import type { ArticleCardProps } from './ArticleCard.types';

export default function ArticleCard({
  companyId,
  companyName,
  post,
  onBookmarkToggle,
}: ArticleCardProps) {
  const navigate = useNavigate();
  const blogPath = toBlog(String(companyId), String(post.postId));
  const date = post.publishedAt.slice(0, 10);

  return (
    <S.Card>
      <S.TopRow>
        <S.Tags>
          <S.CompanyTag>{companyName}</S.CompanyTag>
          {post.categories.map((category) => (
            <Hashtag key={`category-${category}`} variant="category">
              {category}
            </Hashtag>
          ))}
          {post.skills.map((skill) => (
            <Hashtag key={`skill-${skill}`} variant="tech">
              {skill}
            </Hashtag>
          ))}
        </S.Tags>
        <S.Actions>
          {/* 글 화면에서 가이드 패널을 바로 열 수 있게 state 로 알려 준다 */}
          <Button
            variant="soft"
            onClick={() => navigate(blogPath, { state: { openAiGuide: true } })}
          >
            AI 가이드 보기
          </Button>
          <BookmarkButton bookmarked={post.bookmarked} onClick={() => onBookmarkToggle(post)} />
        </S.Actions>
      </S.TopRow>
      <S.Date dateTime={date}>{date}</S.Date>
      <S.Title>
        <S.TitleLink to={blogPath}>{post.title}</S.TitleLink>
      </S.Title>
      <S.Summary>{post.summary}</S.Summary>
    </S.Card>
  );
}
