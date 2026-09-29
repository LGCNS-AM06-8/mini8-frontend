// GET /api/bookmarks
export interface BookmarkItem {
  bookmarkId: number;
  postId: number;
  companyId: number;
  title: string;
  companyName: string;
  categories: string[];
  skills: string[];
  summary: string;
  publishedAt: string;
  savedAt: string;
  hasGuide: boolean;
}

export interface BookmarksResponse {
  bookmarks: BookmarkItem[];
  count: number;
}
