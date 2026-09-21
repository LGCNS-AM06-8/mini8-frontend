import * as S from './Placeholder.styles';

// F0a 라우팅 확인용 임시 화면. 각 화면 담당자가 내용을 채우면서 지운다.
export default function Placeholder({ path, ticket }: { path: string; ticket: string }) {
  return (
    <S.Container>
      <S.Path>{path}</S.Path>
      <S.Note>{ticket} 작업 예정</S.Note>
    </S.Container>
  );
}
