import { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  setStickerPos,
  removeSticker,
  setStickerScale,
} from "../../store/actions/cardActions";

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
    setStickerScale: (index, scale) => dispatch(setStickerScale(index, scale)),
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
    scale: 1,
  });
  const [selIndex, setSelIndex] = useState();
  const [page, setPage] = useState({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const card = useRef();
  let target = useRef();

  const moveSelector = useCallback(() => {
    const padding = 50;
    const width = props.stickers[selIndex].width + padding;
    const height = props.stickers[selIndex].height + padding;
    const y = props.stickers[selIndex].y - padding / 2;
    const x = props.stickers[selIndex].x - padding / 2;
    setSelector({ width, height, y, x, display: "block", scale: 1 });
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

  const onDrag = useCallback(
    (event) => {
      moveXY(event);
    },
    [moveXY]
  );

  const onDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDown = useCallback(
    (event) => {
      target.current = event.target.getBoundingClientRect();
      setPage({ x: event.pageX, y: event.pageY });
      moveSelector(event);
    },
    [moveSelector]
  );

  const onDragStart = useCallback(
    (event, index) => {
      setIsDragging(true);
      setSelIndex(index);
      handleMouseDown(event);
    },
    [handleMouseDown]
  );

  /** 카드 확대, 축소, 회전 */
  const onModifyStart = useCallback(
    (event) => {
      setIsModify(true);
      handleMouseDown(event);
    },
    [handleMouseDown]
  );

  const onModify = useCallback(
    (event) => {
      // const width = props.stickers[selIndex].width;
      const height = props.stickers[selIndex].height;
      const diff = event.pageY - page.y;

      // const nextWidth = width + diff;
      const nextHeight = height + diff;
      const scale = nextHeight / height;
      console.log(scale);
      props.setStickerScale(selIndex, scale);
    },
    [page, selIndex, props]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", onDragEnd);
    }

    return () => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", onDragEnd);
    };
  }, [isDragging, onDrag, onDragEnd]);

  useEffect(() => {
    if (isModify) {
      document.addEventListener("mousemove", onModify);
    }
    return () => {
      document.removeEventListener("mousemove", onModify);
    };
  }, [isModify, onModify]);

  const removeSticker = () => {
    props.removeSticker(selIndex);
    setSelector({ ...selector, display: "none" });
  };

  return (
    <Card Card background={props.background} ref={card}>
      {props.stickers.map((sticker, index) => (
        <Sticker
          key={index}
          sticker={sticker}
          onDragStart={() => false}
          onMouseDown={(event) => onDragStart(event, index)}
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
        <ModifyButton onMouseDown={(event) => onModifyStart(event)}>
          O
        </ModifyButton>
      </Selector>
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

const Sticker = styled.div.attrs((props) => ({
  style: {
    position: "absolute",
    top: `${props.sticker.y}px`,
    left: `${props.sticker.x}px`,
    width: `${props.sticker.width}px`,
    height: `${props.sticker.height}px`,
    transform: `scale(${props.sticker.scale})`,
  },
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
    transform: `scale(${props.selector.scale})`,
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
