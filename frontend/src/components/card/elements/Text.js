import styled from "styled-components";
import { connect } from "react-redux";
import { setTextPos } from "../../../store/actions/cardActions";
import { useState, useEffect, useCallback, useRef } from "react";

function mapStateToProps({ cardReducer }) {
  return {
    text: cardReducer.text,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTextPos: (x, y) => dispatch(setTextPos(x, y)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Text);

function Text({ card, text, setTextPos }) {
  const [page, setPage] = useState({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState();
  const target = useRef();

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

      setTextPos(nextX, nextY);
    },
    [page, card, setTextPos]
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

  const handleMouseDown = useCallback((event) => {
    target.current = event.target.getBoundingClientRect();
    setPage({ x: event.pageX, y: event.pageY });
  }, []);

  const onDragStart = useCallback(
    (event) => {
      setIsDragging(true);
      handleMouseDown(
        event.type === "touchstart" ? event.changedTouches[0] : event
      );
    },
    [handleMouseDown]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", onDragEnd);

      document.addEventListener("touchmove", onDrag);
      document.addEventListener("touchend", onDragEnd);
    }

    return () => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", onDragEnd);

      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("touchend", onDragEnd);
    };
  }, [isDragging, onDrag, onDragEnd]);

  return (
    <Container
      text={text}
      onDragStart={() => false}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
    >
      {text.message}
    </Container>
  );
}

const Container = styled.div.attrs((props) => ({
  style: {
    position: "absolute",
    top: `${props.text.y}px`,
    left: `${props.text.x}px`,
  },
}))`
  font-family: "Gowun Batang";
  font-weight: bold;
  cursor: pointer;
`;
