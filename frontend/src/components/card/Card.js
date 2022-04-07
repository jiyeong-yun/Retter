import { useRef, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Sticker from "./elements/Sticker";
import Selector from "./elements/Selector";

function mapStateToProps({ cardReducer }) {
  return {
    background: cardReducer.background,
    stickers: cardReducer.stickers,
    text: cardReducer.text,
  };
}

export default connect(mapStateToProps)(CardComponent);

function CardComponent(props) {
  const [selIndex, setSelIndex] = useState();
  const card = useRef();

  return (
    <Card background={props.background} ref={card}>
      {props.stickers.map((sticker, index) => (
        <Sticker
          card={card}
          key={index}
          index={index}
          setSelIndex={setSelIndex}
        ></Sticker>
      ))}
      <Selector index={selIndex} />
      {props.text.isVisible ? props.text.message : null}
    </Card>
  );
}

const Card = styled.section.attrs((props) => ({
  id: "card",
}))`
  background-color: ${(props) => props.background.color};
  background-image: url(${(props) => props.background.image});
  background-size: cover;
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
`;
