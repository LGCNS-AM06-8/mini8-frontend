import type { ArticleCardPost } from '@/components';

export interface BookmarkedPost extends ArticleCardPost {
  companyId: number;
  companyName: string;
  // 저장한 시각. "최근 저장 순" 정렬 기준(명세 확정 전이라 우선 이 값으로 정렬한다).
  bookmarkedAt: string;
}

// GET /api/bookmarks 목데이터 (F7). API 연동 전이라 mockFav 로 화면만 구성한다.
const mockBookmarkedPosts: BookmarkedPost[] = [
  {
    postId: 102,
    companyId: 1,
    companyName: '우아한형제들',
    title: '집 나간 네트워크는 돌아왔는데 React.lazy는 왜 안 돌아올까',
    publishedAt: '2026-09-15',
    categories: ['Frontend'],
    skills: ['React'],
    summary:
      '파트너(업주)님이 영업 내내 주문을 받는 배민주문접수 웹뷰를 개발하던 중, QA 과정에서 네트워크가 오프라인에서 온라인으로 바뀐 뒤 다른 화면으로 이동하면 오류 화면이 뜨는 문제를 발견했습니다. 원인을 추적해보니 브라우저가 한 번 실패한 모듈 요청을 내부적으로 계속 캐시하고 있었고, 이는 버그가 아니라 HTML 스펙에 명시된 동작이었습니다.',
    bookmarked: true,
    bookmarkedAt: '2026-09-24T09:12:00',
  },
  {
    postId: 101,
    companyId: 1,
    companyName: '우아한형제들',
    title: 'Kafka 와 Redis 로 주문 이벤트 유실 없이 처리하기',
    publishedAt: '2026-08-02',
    categories: ['Backend'],
    skills: ['Kafka', 'Redis'],
    summary:
      '주문 상태가 바뀔 때마다 이벤트를 발행하면서 생긴 중복·유실 문제를 Kafka 트랜잭션과 Redis 멱등 키로 막은 과정을 정리했습니다.',
    bookmarked: true,
    bookmarkedAt: '2026-09-20T18:40:00',
  },
  {
    postId: 701,
    companyId: 7,
    companyName: '올리브영',
    title: '올리브영 검색 랭킹 개선기',
    publishedAt: '2026-06-03',
    categories: ['Data'],
    skills: ['Elasticsearch'],
    summary: '검색어별 클릭 데이터를 모아 랭킹 모델을 다시 학습시킨 과정을 소개합니다.',
    bookmarked: true,
    bookmarkedAt: '2026-09-11T08:05:00',
  },
];

export const mockGetBookmarks = (): BookmarkedPost[] =>
  [...mockBookmarkedPosts].sort((a, b) => b.bookmarkedAt.localeCompare(a.bookmarkedAt));
