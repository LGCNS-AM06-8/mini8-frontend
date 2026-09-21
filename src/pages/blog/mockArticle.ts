import type { HashtagVariant } from '@/components';

// 목차 클릭 시 스크롤할 원문 섹션의 DOM id. Blog · AiGuideDrawer 양쪽에서 같은 규칙을 써야 해서 한 곳에 둔다.
export const getArticleSectionElementId = (sectionId: string) => `article-section-${sectionId}`;

export interface ArticleSection {
  id: string;
  order: number;
  title: string;
  body: string;
  highlighted?: boolean;
}

export interface ArticleHashtag {
  label: string;
  variant: HashtagVariant;
}

export interface Article {
  date: string;
  relativeDate: string;
  hashtags: ArticleHashtag[];
  title: string;
  originalUrl: string;
  sections: ArticleSection[];
}

// F6 티켓 목데이터. 실제 API 연동 전까지 화면 구조 확인용.
export const mockArticle: Article = {
  date: '2026-09-15',
  relativeDate: '3일 전',
  hashtags: [
    { label: 'Frontend', variant: 'category' },
    { label: 'React', variant: 'tech' },
    { label: 'Vite', variant: 'tech' },
  ],
  title: '집 나간 네트워크는 돌아왔는데 React.lazy는 왜 안 돌아올까',
  originalUrl: '#',
  sections: [
    {
      id: '1',
      order: 1,
      title: '들어가며',
      body: '파트너(업주)님이 영업 내내 주문을 받는 배민주문접수 웹뷰를 개발하던 중 QA 과정에서 네트워크 OFF → ON으로 변경 후 다른 화면으로 이동 시 오류 화면이 노출된다는 티켓을 전달받았습니다. 원인을 파악해 보니 브라우저가 모듈 로드 실패를 기억하고 있었고, 이는 버그가 아니라 HTML 스펙에 명시된 동작이었습니다.',
    },
    {
      id: '2',
      order: 2,
      title: '회사 내부 상황',
      body: '배민주문접수 웹뷰는 파트너센터 앱 안에서 웹뷰로 열리고, 배포는 2주 단위 정기 배포와 핫픽스 배포로 나뉘어 있습니다. 이번 티켓은 정기 배포 QA 중 발견되어 다음 배포 전까지 원인 파악과 수정이 필요했습니다.',
    },
    {
      id: '3',
      order: 3,
      title: '문제를 재현해보다',
      body: '개발자 도구 네트워크 탭에서 특정 청크 요청만 골라 오프라인으로 바꾼 뒤 다시 온라인으로 돌리고, 해당 청크를 쓰는 화면으로 이동해 보니 매번 동일하게 오류 화면이 떴습니다. 새로고침 전에는 같은 화면을 아무리 왔다 갔다 해도 복구되지 않았습니다.',
    },
    {
      id: '4',
      order: 4,
      title: 'React.lazy 재시도가 통하지 않았다',
      highlighted: true,
      body: '재시도 로직을 감싸 보았습니다. import() 를 다시 호출하면 될 것이라 기대했지만 결과는 같았습니다. 같은 모듈을 다시 import 해도 브라우저는 이전 실패 결과를 그대로 돌려줍니다. 이 동작은 HTML 스펙의 module map 에 정의돼 있습니다. 한 번 실패한 모듈 레코드는 실패 상태로 map 에 남고, 같은 URL 에 대한 이후 요청은 네트워크를 타지 않습니다.',
    },
    {
      id: '5',
      order: 5,
      title: '모듈 맵은 실패도 기억한다',
      highlighted: true,
      body: '따라서 재시도를 하려면 브라우저가 같은 URL 로 인식하지 않게 만들어야 합니다. 쿼리스트링을 붙여 URL 을 바꾸는 방법이 가장 먼저 떠오릅니다.',
    },
    {
      id: '6',
      order: 6,
      title: '쿼리스트링으로 캐시 우회하기',
      highlighted: true,
      body: 'URL 끝에 무작위 쿼리스트링을 붙여 모듈을 다시 요청하면 브라우저는 새로운 요청으로 인식해 네트워크를 통해 재시도합니다. 예를 들어, `module.js?retry=1` 과 같이 변경하는 방법입니다.',
    },
    {
      id: '7',
      order: 7,
      title: '캐시 무효화의 부작용',
      highlighted: true,
      body: '쿼리스트링을 사용해 재시도하는 것은 임시방편이며, 매번 URL이 바뀌므로 캐시 이점을 상실합니다. 이로 인해 불필요한 네트워크 비용과 로딩 지연이 발생할 수 있어 주의가 필요합니다.',
    },
    {
      id: '8',
      order: 8,
      title: '마무리',
      body: '결국 쿼리스트링 재시도 대신, 실패한 청크 로드를 감지해 전체 페이지를 한 번만 새로고침하는 방식으로 정리했습니다. 캐시를 깨지 않으면서도 사용자가 오류 화면에 머무르지 않도록 하는 절충안이었습니다. React.lazy 를 쓴다면 배포 직후 발생하는 이런 종류의 청크 로드 실패를 별도로 처리해두는 걸 추천합니다.',
    },
  ],
};

export interface AiGuideCardSection {
  id: string;
  title: string;
  body: string;
}

export interface AiGuide {
  cardSections: AiGuideCardSection[];
}

// AI 가이드 드로어 목데이터 (F6). "05 AI가이드" 와이어프레임 문구 그대로.
export const mockAiGuide: AiGuide = {
  cardSections: [
    {
      id: 'where-to-start',
      title: '어디서 부터 읽어야 할까?',
      body: '4번 구간부터 보세요. 수업에서 배운 lazy loading이 실무에서 왜 깨지는지가 여기 나옵니다. 2번은 회사 내부 상황 설명이라 건너뛰어도 됩니다.',
    },
    {
      id: 'reading-order',
      title: '나에게 맞는 읽기 순서는?',
      body: '1번으로 맥락을 잡고 → 4번에서 문제를 이해하고 → 5번에서 원인을 확인하세요. 6·7번은 해결 시도 과정이라 나중에 봐도 됩니다.',
    },
    {
      id: 'next-study',
      title: '다음 공부는 이렇게!',
      body: '코드 스플리팅, 브라우저 모듈 맵, Vite 빌드 옵션. Java·Spring만 다뤄 보셨다면 「모듈을 나눠서 필요할 때 받아온다」는 개념부터 잡으면 좋습니다.',
    },
  ],
};
