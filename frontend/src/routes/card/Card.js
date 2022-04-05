import MenuBar from "../../components/card/MenuBar";
import Card from "../../components/card/Card";
import Options from "../../components/card/Options";
import styled from "styled-components";

export default function CardPage() {
  return (
    <div>
      <Center>
        <MenuBar /> 
      </Center>
      <Center>
        <Card />
      </Center>

      <Center>
        <Options />
      </Center>
    </div>
  );
}

const Center = styled.div `
  justify-content: center;
  display: flex;
  align-items: center;
`
