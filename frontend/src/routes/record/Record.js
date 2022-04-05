import styled from "styled-components";
import Record from "../../components/record/Record";

export default function CardPage() {
  return (
    <CONTAINER1>
      <TITLE>카드녹음하기</TITLE>
      <Record />
    </CONTAINER1>
  );
}

const CONTAINER1 = styled.div`
  width : 100vw;
  height : 100vh;

`;

const TITLE = styled.h1`
  text-align : center;
  margin : 0;
  padding-top : 2em;
  font-size: 2rem;
  font-family: Noto Sans KR;
`;
