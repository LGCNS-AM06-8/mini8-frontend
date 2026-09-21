import styled from 'styled-components';

import ChevronLeftIcon from '@/assets/icons/chevron-left.svg?react';
import ExternalLinkIcon from '@/assets/icons/external-link.svg?react';
import BookmarkIcon from '@/assets/icons/bookmark.svg?react';
import CoreMarkerIcon from '@/assets/icons/core-marker.svg?react';
import AiGuideIcon from '@/assets/icons/ai-guide.svg?react';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 7.5rem 1rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.5rem;
  background-color: transparent;
  cursor: pointer;
`;

export const BackIcon = styled(ChevronLeftIcon)`
  width: 0.6875rem;
  height: 0.6875rem;
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
`;

export const Date = styled.p`
  ${({ theme }) => theme.fonts.body.large400};
  color: ${({ theme }) => theme.colors.violet.vt500};
  white-space: nowrap;
`;

export const RelativeDate = styled.p`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.gy700};
  white-space: nowrap;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  width: 100%;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.header.h2};
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const TitleSpacer = styled.div`
  flex: 1;
`;

export const IconButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.125rem;
  height: 2.125rem;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.violet.vt200};
  cursor: pointer;
`;

export const BookmarkButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.125rem;
  height: 2.125rem;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.violet.vt200};
  cursor: pointer;
`;

export const ExternalLinkIconGlyph = styled(ExternalLinkIcon)`
  width: 0.875rem;
  height: 0.875rem;
`;

export const BookmarkIconGlyph = styled(BookmarkIcon)`
  width: 0.875rem;
  height: 1rem;
`;

export const Body = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

export const OriginalArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 1.875rem;
  padding: 1.875rem 7.5rem;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  width: 100%;
`;

export const SectionHeadingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

export const SectionHeading = styled.h2<{ $highlighted: boolean }>`
  ${({ theme }) => theme.fonts.header.h3};
  color: ${({ $highlighted, theme }) =>
    $highlighted ? theme.colors.violet.vt500 : theme.colors.grayScale.black};
`;

export const SectionMarker = styled(CoreMarkerIcon)`
  width: 0.8125rem;
  height: 0.8125rem;
  flex-shrink: 0;
`;

export const SectionBody = styled.p`
  ${({ theme }) => theme.fonts.body.medium400};
  color: ${({ theme }) => theme.colors.grayScale.gy900};
  width: 100%;
`;

export const AiGuideToggle = styled.button`
  position: fixed;
  right: 8.0625rem;
  bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border: none;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.violet.vt500};
  box-shadow: -2px 4px 16px 0 rgb(0 0 0 / 18%);
  cursor: pointer;
`;

export const AiGuideToggleIcon = styled(AiGuideIcon)`
  width: 1.25rem;
  height: 1.25rem;
`;
