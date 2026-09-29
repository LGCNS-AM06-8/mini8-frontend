// GET /api/posts/{id}
export interface PostSection {
  seq: number;
  heading: string;
  charCount: number;
}

export interface PostDetail {
  postId: number;
  title: string;
  publishedAt: string;
  companyName: string;
  categories: string[];
  skills: string[];
  charCount: number;
  originalUrl: string;
  // 구간마다 id="section-{seq}" 앵커 존재
  contentHtml: string;
  sections: PostSection[];
  bookmarked: boolean;
}
