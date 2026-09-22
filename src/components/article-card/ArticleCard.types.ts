import type { CompanyPost } from '@/types/company';

// 카드가 그리는 데 필요한 필드만 받는다. F7 북마크 목록도 같은 필드로 맞춰 넘기면 된다.
export type ArticleCardPost = Pick<
  CompanyPost,
  'postId' | 'title' | 'publishedAt' | 'summary' | 'categories' | 'skills' | 'bookmarked'
>;

export interface ArticleCardProps {
  companyId: number;
  // 카드 맨 앞의 기업 태그. Figma v5 기준 항상 표기한다.
  companyName: string;
  post: ArticleCardPost;
  onBookmarkToggle: (post: ArticleCardPost) => void;
}
