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

  const checkSelector = useCallback((event) => {
    if (typeof event.target.className !== "string") return;

    if (!event.target.className.includes("element")) {
      setSelector((selector) => ({ ...selector, display: "none" }));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", checkSelector);
    return () => {
      document.removeEventListener("click", checkSelector);
    };
  }, [checkSelector]);

  const moveSelector = useCallback(
    (nextScale) => {
      const scale = nextScale ? nextScale : 1;
      const padding = 50;
      const width = props.stickers[selIndex].width + padding;
      const height = props.stickers[selIndex].height + padding;
      const y = props.stickers[selIndex].y - padding / 2;
      const x = props.stickers[selIndex].x - padding / 2;
      setSelector({
        width,
        height,
        y,
        x,
        display: "block",
        scale,
      });
    },
    [props.stickers, selIndex]
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

      props.setStickerPos(selIndex, nextX, nextY);
      moveSelector();
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
      // console.log(
      //   `height: ${height}, nextHeight: ${nextHeight}, diff: ${diff}`
      // );
      // console.log(`scale: ${scale}`);
      // console.log(scale);
      props.setStickerScale(selIndex, scale);
      moveSelector(scale);
    },
    [page, selIndex, props, moveSelector]
  );

  const onModifyEnd = useCallback(() => {
    setIsModify(false);
  }, []);

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
      document.addEventListener("mouseup", onModifyEnd);
    }
    return () => {
      document.removeEventListener("mousemove", onModify);
      document.addEventListener("mouseup", onModifyEnd);
    };
  }, [isModify, onModify, onModifyEnd]);

  const removeSticker = useCallback(() => {
    props.removeSticker(selIndex);
    setSelector((selector) => ({ ...selector, display: "none" }));
  }, [props, selIndex]);

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
        <ModifyButton
          className="element"
          onMouseDown={(event) => onModifyStart(event)}
        >
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

const Selector = styled.div.attrs((props) => ({
  className: "element",
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
