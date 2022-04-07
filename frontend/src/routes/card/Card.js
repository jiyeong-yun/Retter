import MenuBar from "../../components/card/MenuBar";
import Card from "../../components/card/Card";
import Options from "../../components/card/Options";
import styled from "styled-components";
import { setTitle } from "../../components/Title";
import { useEffect } from "react";

export default function CardPage() {
  useEffect(() => setTitle("카드 편집"), []);
  return (
    <Container>
      <Center>
        <MenuBar />
      </Center>
      <Center>
        <Card />
      </Center>

      <Center>
        <Options />
      </Center>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;

const Center = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
`;
