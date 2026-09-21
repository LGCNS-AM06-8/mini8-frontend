import type { HashtagVariant } from '@/components';

export interface ArticleSection {
  id: string;
  heading: string;
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
  ],
  title: '집 나간 네트워크는 돌아왔는데 React.lazy는 왜 안 돌아올까',
  originalUrl: '#',
  sections: [
    {
      id: '1',
      heading: '1. 들어가며',
      body: '파트너(업주)님이 영업 내내 주문을 받는 배민주문접수 웹뷰를 개발하던 중 QA 과정에서 네트워크 OFF → ON으로 변경 후 다른 화면으로 이동 시 오류 화면이 노출된다는 티켓을 전달받았습니다. 원인을 파악해 보니 브라우저가 모듈 로드 실패를 기억하고 있었고, 이는 버그가 아니라 HTML 스펙에 명시된 동작이었습니다.',
    },
    {
      id: '4',
      heading: '4. React.lazy 재시도가 통하지 않았다',
      highlighted: true,
      body: '재시도 로직을 감싸 보았습니다. import() 를 다시 호출하면 될 것이라 기대했지만 결과는 같았습니다. 같은 모듈을 다시 import 해도 브라우저는 이전 실패 결과를 그대로 돌려줍니다. 이 동작은 HTML 스펙의 module map 에 정의돼 있습니다. 한 번 실패한 모듈 레코드는 실패 상태로 map 에 남고, 같은 URL 에 대한 이후 요청은 네트워크를 타지 않습니다.',
    },
    {
      id: '5',
      heading: '5. 모듈 맵은 실패도 기억한다',
      highlighted: true,
      body: '따라서 재시도를 하려면 브라우저가 같은 URL 로 인식하지 않게 만들어야 합니다. 쿼리스트링을 붙여 URL 을 바꾸는 방법이 가장 먼저 떠오릅니다.',
    },
    {
      id: '6',
      heading: '6. 쿼리스트링으로 캐시 우회하기',
      highlighted: true,
      body: 'URL 끝에 무작위 쿼리스트링을 붙여 모듈을 다시 요청하면 브라우저는 새로운 요청으로 인식해 네트워크를 통해 재시도합니다. 예를 들어, `module.js?retry=1` 과 같이 변경하는 방법입니다.',
    },
    {
      id: '7',
      heading: '7. 캐시 무효화의 부작용',
      highlighted: true,
      body: '쿼리스트링을 사용해 재시도하는 것은 임시방편이며, 매번 URL이 바뀌므로 캐시 이점을 상실합니다. 이로 인해 불필요한 네트워크 비용과 로딩 지연이 발생할 수 있어 주의가 필요합니다.',
    },
  ],
};
