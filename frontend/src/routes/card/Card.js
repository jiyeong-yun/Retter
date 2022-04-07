import MenuBar from "../../components/card/MenuBar";
import Card from "../../components/card/Card";
import Options from "../../components/card/Options";
import styled from "styled-components";

export default function CardPage() {
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
