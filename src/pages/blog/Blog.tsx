import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AiGuideDrawer, Hashtag } from '@/components';
import { getArticleSectionElementId, mockArticle } from './mockArticle';
import * as S from './Blog.styles';

// AI 가이드 페이지 (F6). 기업 카드의 "AI 가이드 보기" 버튼을 누르면 열린다.
export default function Blog() {
  const navigate = useNavigate();
  const [isAiGuideOpen, setIsAiGuideOpen] = useState(false);

  return (
    <S.Container>
      <S.Header>
        <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="뒤로 가기">
          <S.BackIcon />
        </S.BackButton>
        <S.TitleBlock>
          <S.MetaRow>
            <S.Date>{mockArticle.date}</S.Date>
            <S.RelativeDate>{mockArticle.relativeDate}</S.RelativeDate>
            {mockArticle.hashtags.map((hashtag) => (
              <Hashtag key={hashtag.label} variant={hashtag.variant}>
                {hashtag.label}
              </Hashtag>
            ))}
          </S.MetaRow>
          <S.TitleRow>
            <S.Title>{mockArticle.title}</S.Title>
            <S.TitleSpacer />
            <S.IconButton
              href={mockArticle.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="원문 보기"
            >
              <S.ExternalLinkIconGlyph />
            </S.IconButton>
            <S.BookmarkButton type="button" aria-label="북마크">
              <S.BookmarkIconGlyph />
            </S.BookmarkButton>
          </S.TitleRow>
        </S.TitleBlock>
      </S.Header>

      <S.Body>
        <S.OriginalArea>
          {mockArticle.sections.map((section) => (
            <S.Section key={section.id} id={getArticleSectionElementId(section.id)}>
              <S.SectionHeadingRow>
                <S.SectionHeading $highlighted={Boolean(section.highlighted)}>
                  {section.order}. {section.title}
                </S.SectionHeading>
                {section.highlighted && <S.SectionMarker />}
              </S.SectionHeadingRow>
              <S.SectionBody>{section.body}</S.SectionBody>
            </S.Section>
          ))}
        </S.OriginalArea>
      </S.Body>

      {isAiGuideOpen ? (
        <AiGuideDrawer sections={mockArticle.sections} onClose={() => setIsAiGuideOpen(false)} />
      ) : (
        <S.AiGuideToggle
          type="button"
          aria-label="AI 가이드 열기"
          onClick={() => setIsAiGuideOpen(true)}
        >
          <S.AiGuideToggleIcon />
        </S.AiGuideToggle>
      )}
    </S.Container>
  );
}
