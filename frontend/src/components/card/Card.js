import { useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setStickerPos } from "../../store/actions/cardActions";

function mapStateToProps({ cardReducer }) {
  return {
    background: cardReducer.background,
    stickers: cardReducer.stickers,
    text: cardReducer.text,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setStickerPos: (index, x, y) => dispatch(setStickerPos(index, x, y)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);

function CardComponent({ background, stickers, text, setStickerPos }) {
  const card = useRef();
  let pageX, pageY;
  const handleDragStart = (event) => {
    // 커서 위치를 구하기 위해 이동 전 좌표를 저장해둠
    pageX = event.pageX;
    pageY = event.pageY;
  };

  const handleDragEnd = (event, index) => {
    const cardRef = card.current.getBoundingClientRect();
    const target = event.target.getBoundingClientRect();

    // 마우스 커서 위치를 기억
    const shiftX = pageX - target.left;
    const shiftY = pageY - target.top;

    // 다음 좌표 갱신
    let nextX = event.pageX - cardRef.left - shiftX;
    let nextY = event.pageY - cardRef.top - shiftY;

    // 카드 영역 밖으로는 나가지 못하도록 함
    if (nextX < 0) nextX = 0;
    if (nextY < 0) nextY = 0;
    if (nextX > cardRef.width - target.width)
      nextX = cardRef.width - target.width;
    if (nextY > cardRef.height - target.height)
      nextY = cardRef.height - target.height;

    setStickerPos(index, nextX, nextY);
  };

  return (
    <Card background={background} ref={card}>
      {stickers.map((sticker, index) => (
        <Sticker
          key={index}
          sticker={sticker}
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragEnd={(event) => handleDragEnd(event, index)}
        >
          {sticker.id}
        </Sticker>
      ))}
      {text.isVisible ? text.message : null}
    </Card>
  );
}

const Card = styled.section`
  background-color: ${(props) => props.background.color};
  background-image: url(${(props) => props.background.image});
  background-size: cover;
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
`;

const Sticker = styled.div`
  position: absolute;
  top: ${(props) => props.sticker.y}px;
  left: ${(props) => props.sticker.x}px;
  width: ${(props) => props.sticker.width}px;
  height: ${(props) => props.sticker.height}px;
  background-color: orange;

  cursor: grab;
`;
