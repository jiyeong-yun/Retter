import styled from "styled-components";
import Record from "../../components/record/Record";

export default function CardPage() {
  return (
    <CONTAINER1>
      <TITLE>카드 녹음하기</TITLE>
      <Record />
    </CONTAINER1>
  );
}

const CONTAINER1 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TITLE = styled.h1`
  // height : 20vh;
  text-align: center;
  padding-top: 1em;
  padding-bottom: 1em;
  font-size: 19pt;
  font-family: "Gowun Batang";
  font-weight: bold;
`;
