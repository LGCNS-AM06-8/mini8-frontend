import { useEffect } from 'react';

import {
  getArticleSectionElementId,
  mockAiGuide,
  type ArticleSection,
} from '@/pages/blog/mockArticle';
import TocRow from '@/components/TocRow/TocRow';
import * as S from './AiGuideDrawer.styles';

type AiGuideDrawerProps = {
  sections: ArticleSection[];
  onClose: () => void;
};

export default function AiGuideDrawer({ sections, onClose }: AiGuideDrawerProps) {
  // 드로어가 떠 있는 동안 뒤쪽 페이지가 스크롤/클릭되지 않게 막는다.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleTocClick = (sectionId: string) => {
    document.getElementById(getArticleSectionElementId(sectionId))?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <S.Overlay type="button" onClick={onClose} aria-label="AI 가이드 닫기" />
      <S.Drawer>
        <S.Header>
          <S.Title>AI 읽기 가이드</S.Title>
          <S.CloseButton type="button" onClick={onClose} aria-label="AI 가이드 닫기">
            <S.CloseIconGlyph />
          </S.CloseButton>
        </S.Header>

        <S.Card>
          {mockAiGuide.cardSections.map((section) => (
            <S.CardSection key={section.id}>
              <S.CardSectionTitle>{section.title}</S.CardSectionTitle>
              <S.CardSectionBody>{section.body}</S.CardSectionBody>
            </S.CardSection>
          ))}
        </S.Card>

        <S.TocLabel>목차</S.TocLabel>
        <S.TocList>
          {sections.map((section) => (
            <TocRow
              key={section.id}
              order={section.order}
              title={section.title}
              highlighted={section.highlighted}
              onClick={() => handleTocClick(section.id)}
            />
          ))}
        </S.TocList>
        <S.ScrollFade />
      </S.Drawer>
    </>
  );
}
