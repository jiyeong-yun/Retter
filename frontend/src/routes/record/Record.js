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
  // height : 20vh;
  text-align : center;
  padding-top : 3.5em;
  padding-bottom : 2em;
  font-size: 2rem;
  font-family: 'Gowun Batang';
  font-weight: bold;
`;
