import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArticleCard, StateNotice } from '@/components';
import type { ArticleCardPost } from '@/components';
import { PATHS } from '@/constants/paths';

import * as S from './Fav.styles';
import { mockGetBookmarks } from './mockFav';

// 북마크 목록 (F7). API 연동 전이라 mockFav 로 화면만 구성함
export default function Fav() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState(mockGetBookmarks);

  const handleBookmarkToggle = (post: ArticleCardPost) => {
    //저장 해제 시, 서버 요청을 기다리지 않고 즉시 목록에서 제거
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.postId !== post.postId));
    console.info(`[mock] DELETE /api/bookmarks/${post.postId}`);
  };

  return (
    <S.Container>
      <S.Title>북마크</S.Title>
      {bookmarks.length > 0 ? (
        <>
          <S.Subtitle>최근 저장 순 · {bookmarks.length}편</S.Subtitle>
          <S.List>
            {bookmarks.map((bookmark) => (
              <li key={bookmark.postId}>
                <ArticleCard
                  companyId={bookmark.companyId}
                  companyName={bookmark.companyName}
                  post={bookmark}
                  onBookmarkToggle={handleBookmarkToggle}
                />
              </li>
            ))}
          </S.List>
        </>
      ) : (
        <StateNotice
          tone="empty"
          title="아직 저장한 글이 없어요"
          description="기업 블로그 글에서 북마크를 눌러 여기에 모아 볼 수 있어요."
          action={{ label: '기업 목록으로', onClick: () => navigate(PATHS.HOME) }}
        />
      )}
    </S.Container>
  );
}
