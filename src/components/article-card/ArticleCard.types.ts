import type { CompanyPost } from '@/types/company';

export type ArticleCardPost = Pick<
  CompanyPost,
  'postId' | 'title' | 'publishedAt' | 'summary' | 'categories' | 'skills' | 'bookmarked'
>;

export interface ArticleCardProps {
  companyId: number;
  companyName: string;
  post: ArticleCardPost;
  onBookmarkToggle: (post: ArticleCardPost) => void;
}
