import styled from "styled-components";
import { useState, useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { setStickerPos } from "../../../store/actions/cardActions";
import { setSelector } from "../../../store/actions/selectorActions";

function mapStateToProps({ cardReducer }) {
  return {
    stickers: cardReducer.stickers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setStickerPos: (index, x, y) => dispatch(setStickerPos(index, x, y)),
    setSelector: (nextSelector) => dispatch(setSelector(nextSelector)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sticker);

function Sticker({
  index,
  card,
  stickers,
  setStickerPos,
  setSelector,
  setSelIndex,
}) {
  const [page, setPage] = useState({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  let target = useRef();

  const moveSelector = useCallback(
    (nextScale) => {
      const scale = nextScale ? nextScale : 1;
      const padding = 50;
      const width = stickers[index].width + padding;
      const height = stickers[index].height + padding;
      const y = stickers[index].y - padding / 2;
      const x = stickers[index].x - padding / 2;
      setSelector({
        width,
        height,
        y,
        x,
        display: "block",
        scale,
      });
    },
    [stickers, index, setSelector]
  );

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

      setStickerPos(index, nextX, nextY);
      moveSelector();
    },
    [page, index, card, setStickerPos, moveSelector]
  );

  const onDrag = useCallback(
    (event) => {
      moveXY(event.type === "mousemove" ? event : event.changedTouches[0]);
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
      moveSelector();
    },
    [moveSelector]
  );

  const onDragStart = useCallback(
    (event, index) => {
      setIsDragging(true);
      setSelIndex(index);
      handleMouseDown(
        event.type === "touchstart" ? event.changedTouches[0] : event
      );
    },
    [handleMouseDown, setSelIndex]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", onDragEnd);

      document.addEventListener("touchmove", onDrag);
      document.addEventListener("touchup", onDragEnd);
    }

    return () => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", onDragEnd);

      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("touchup", onDragEnd);
    };
  }, [isDragging, onDrag, onDragEnd]);

  return (
    <Container
      sticker={stickers[index]}
      onDragStart={() => false}
      onMouseDown={(event) => onDragStart(event, index)}
      onTouchStart={(event) => {
        setSelIndex(index);
        moveSelector();
        onDragStart(event, index);
      }}
    />
  );
}

const Container = styled.div.attrs((props) => ({
  className: "element",
  style: {
    position: "absolute",
    top: `${props.sticker.y}px`,
    left: `${props.sticker.x}px`,
    width: `${props.sticker.width}px`,
    height: `${props.sticker.height}px`,
    transform: `scale(${props.sticker.scale})`,
  },
}))`
  background: url("/images/stickers/${(props) => props.sticker.id}.png") center
    no-repeat;
  background-size: contain;
  z-index: 1;
  cursor: grab;
`;
