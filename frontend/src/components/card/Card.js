import { connect } from "react-redux";
import styled from "styled-components";

function mapStateToProps({ cardReducer }) {
  return {
    background: cardReducer.background,
    stickers: cardReducer.stickers,
    text: cardReducer.text,
  };
}
export default connect(mapStateToProps)(CardComponent);
function CardComponent({ background, stickers, text }) {
  return (
    <Card color={background.color}>
      {stickers.map((sticker, index) => (
        <Sticker key={index} sticker={sticker}>
          {sticker.id}
        </Sticker>
      ))}
      {text.isVisible ? text.message : null}
    </Card>
  );
}

const Card = styled.section`
  background-color: ${(props) => props.color};
  position: relative;
  width: 300px;
  height: 300px;
`;

const Sticker = styled.div`
  cursor: pointer;
  position: absolute;
  top: ${(props) => props.sticker.y}px;
  left: ${(props) => props.sticker.x}px;
  width: ${(props) => props.sticker.width}px;
  height: ${(props) => props.sticker.height}px;
`;
