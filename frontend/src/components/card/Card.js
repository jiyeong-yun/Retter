import { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setStickerPos, removeSticker } from "../../store/actions/cardActions";

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
    removeSticker: (index) => dispatch(removeSticker(index)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);

function CardComponent(props) {
  const [selector, setSelector] = useState({
    width: 200,
    height: 200,
    y: 0,
    x: 0,
    display: "none",
  });
  const [selIndex, setSelIndex] = useState();
  const [page, setPage] = useState({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const card = useRef();
  let target = useRef();

  const moveSelector = useCallback(() => {
    const padding = 50;
    const width = props.stickers[selIndex].width + padding;
    const height = props.stickers[selIndex].height + padding;
    const y = props.stickers[selIndex].y - padding / 2;
    const x = props.stickers[selIndex].x - padding / 2;
    setSelector({ width, height, y, x, display: "block" });
  }, [props.stickers, selIndex]);

  const moveXY = useCallback(
    (event) => {
      const cardRef = card.current.getBoundingClientRect();

      // 마우스 커서 위치를 기억
      const shiftX = page.x - target.current.left;
      const shiftY = page.y - target.current.top;

      // // 다음 좌표 갱신
      let nextX = event.pageX - cardRef.left - shiftX;
      let nextY = event.pageY - cardRef.top - shiftY;

      // // 카드 영역 밖으로는 나가지 못하도록 함
      if (nextX < 0) nextX = 0;
      if (nextY < 0) nextY = 0;
      if (nextX > cardRef.width - target.current.width)
        nextX = cardRef.width - target.current.width;
      if (nextY > cardRef.height - target.current.height)
        nextY = cardRef.height - target.current.height;

      // console.log(`pageX: ${page.x} pageY: ${page.y}`);
      // console.log(`event.pageX: ${event.pageX} pageY: ${event.pageY}`);
      // console.log(`shiftX: ${shiftX} shiftY: ${shiftY}`);
      // console.log(`nextX: ${nextX} nextY: ${nextY}`);
      props.setStickerPos(selIndex, nextX, nextY);
      moveSelector(event);
    },
    [page, selIndex, props, moveSelector]
  );

  const handleMouseMove = useCallback(
    (event) => {
      moveXY(event);
    },
    [moveXY]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDown = useCallback(
    (event, index) => {
      setIsDragging(true);
      target.current = event.target.getBoundingClientRect();
      setSelIndex(index);
      setPage({ x: event.pageX, y: event.pageY });
      moveSelector(event);
    },
    [moveSelector]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const removeSticker = () => {
    props.removeSticker(selIndex);
    setSelector({ ...selector, display: "none" });
  };

  return (
    <Card Card background={props.background} ref={card}>
      {props.stickers.map((sticker, index) => (
        <Sticker
          key={index}
          ref={target}
          sticker={sticker}
          onDragStart={() => false}
          onMouseDown={(event) => handleMouseDown(event, index)}
          onClick={() => {
            setSelIndex(index);
            moveSelector();
          }}
        >
          {/* {sticker.id} */}
        </Sticker>
      ))}
      <Selector selector={selector}>
        <CloseButton onClick={removeSticker}>X</CloseButton>
        <ModifyButton>O</ModifyButton>
      </Selector>
      {props.text.isVisible ? props.text.message : null}
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

const Sticker = styled.div.attrs((props) => ({
  style: {
    position: "absolute",
    top: `${props.sticker.y}px`,
    left: `${props.sticker.x}px`,
    width: `${props.sticker.width}px`,
    height: `${props.sticker.height}px`,
  },
  className: "sticker",
}))`
  background-color: orange;
  z-index: 1;
  cursor: grab;
`;

const Selector = styled.div.attrs((props) => ({
  style: {
    position: "absolute",
    top: `${props.selector.y}px`,
    left: `${props.selector.x}px`,
    width: `${props.selector.width}px`,
    height: `${props.selector.height}px`,
    display: props.selector.display,
  },
}))`
  box-shadow: 0 0 0 1.5px gray inset;
  position: absolute;
`;

const StickerButton = styled.div`
  background-color: skyblue;
  border-radius: 50%;
  position: absolute;
  width: 30px;
  height: 30px;
  cursor: pointer;

  text-align: center;
  padding-top: 3px;
`;

const CloseButton = styled(StickerButton)`
  top: -15px;
  right: -15px;
`;

const ModifyButton = styled(StickerButton)`
  bottom: -15px;
  right: -15px;
`;
