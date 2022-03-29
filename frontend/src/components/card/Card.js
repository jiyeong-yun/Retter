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
  const card = useRef();
  let target = useRef();
  let pageX, pageY;
  const padding = 50;

  const handleMouseMove = useCallback((event) => {
    console.log("마우스 이동");
  });

  const handleMouseUp = useCallback((event) => {
    console.log("마우스 이벤트 끝");
  });

  const handleMouseDown = useCallback(
    (event) => {
      console.log("마우스이벤트");
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleDrag = useCallback((event) => {
    const cardRef = card.current.getBoundingClientRect();
    const targetRect = target.current.getBoundingClientRect();

    // 마우스 커서 위치를 기억
    const shiftX = pageX - targetRect.left;
    const shiftY = pageY - targetRect.top;

    // 다음 좌표 갱신
    let nextX = event.pageX - cardRef.left - shiftX;
    let nextY = event.pageY - cardRef.top - shiftY;

    // 카드 영역 밖으로는 나가지 못하도록 함
    if (nextX < 0) nextX = 0;
    if (nextY < 0) nextY = 0;
    if (nextX > cardRef.width - targetRect.width)
      nextX = cardRef.width - targetRect.width;
    if (nextY > cardRef.height - targetRect.height)
      nextY = cardRef.height - targetRect.height;

    console.log(cardRef);
    console.log(targetRect);
    console.log(`pageX: ${pageX} pageY: ${pageY}`);
    console.log(`event.pageX: ${event.pageX} pageY: ${event.pageY}`);
    console.log(`shiftX: ${shiftX} shiftY: ${shiftY}`);
    console.log(`nextX: ${nextX} nextY: ${nextY}`);
    props.setStickerPos(selIndex, nextX, nextY);

    setSelector({
      ...selector,
      index: selIndex,
      x: nextX - padding / 2,
      y: nextY - padding / 2,
      display: "block",
    });
    pageX = event.pageX;
    pageY = event.pageY;
  }, []);

  const handleDragStart = (event, index) => {
    target.current = event.target;

    // if (!target.current.classList.contains("sticker")) {
    //   document.removeEventListener("mousemove", handleDrag);
    //   return false;
    // }

    // 커서 위치를 구하기 위해 이동 전 좌표를 저장해둠
    pageX = event.pageX;
    pageY = event.pageY;
    setSelIndex(index);
    handleClick(event, selIndex);

    handleDrag(event, index);
    document.addEventListener("mousemove", handleDrag(event));

    target.current.onmouseup = () => {
      document.removeEventListener("mousemove", handleDrag(event));
      target.current.onmouseup = null;
    };
  };

  const handleClick = (event, index) => {
    console.log(selIndex + " " + index);
    const padding = 50;
    // const width = event.currentTarget.offsetWidth + padding;
    // const height = event.currentTarget.offsetHeight + padding;
    const width = props.stickers[index].width + padding;
    const height = props.stickers[index].height + padding;
    const y = props.stickers[index].y - padding / 2;
    const x = props.stickers[index].x - padding / 2;
    setSelector({ width, height, y, x, display: "block" });
  };

  const removeSticker = () => {
    props.removeSticker(selIndex);
    setSelector({ ...selector, display: "none" });
  };

  return (
    <Card Card background={props.background} ref={card}>
      {/* {props.stickers.map((sticker, index) => (
        <Sticker
          key={index}
          sticker={sticker}
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragEnd={(event) => handleDragEnd(event, index)}
          onClick={(event) => handleClick(event, index)}
        >
          {sticker.id}
        </Sticker>
      ))} */}
      {props.stickers.map((sticker, index) => (
        <Sticker
          key={index}
          ref={target}
          sticker={sticker}
          onDragStart={() => false}
          onMouseDown={(event) => handleMouseDown(event, index)}
          // onMouseMove={(event) => handleDragEnd(event, index)}
          // onMouseUp={(event) => handleDragEnd(event, index)}
          onClick={(event) => handleClick(event, index)}
        >
          {/* {sticker.id} */}
        </Sticker>
      ))}
      <Selector selector={selector}>
        <div onClick={removeSticker}>X</div>
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

  div {
    background-color: skyblue;
    border-radius: 50%;
    position: absolute;
    top: -15px;
    right: -15px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    text-align: center;
    padding-top: 3px;
  }
`;

// import { useCallback, useRef, useState } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";
// import { setStickerPos, removeSticker } from "../../store/actions/cardActions";

// function mapStateToProps({ cardReducer }) {
//   return {
//     background: cardReducer.background,
//     stickers: cardReducer.stickers,
//     text: cardReducer.text,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     setStickerPos: (index, x, y) => dispatch(setStickerPos(index, x, y)),
//     removeSticker: (index) => dispatch(removeSticker(index)),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);

// function CardComponent(props) {
//   const [selector, setSelector] = useState({
//     width: 200,
//     height: 200,
//     y: 0,
//     x: 0,
//     display: "none",
//   });
//   const [selIndex, setSelIndex] = useState();
//   const card = useRef();
//   let target = useRef();
//   let pageX, pageY;
//   const padding = 50;

//   const handleDrag = useCallback((event) => {
//     const cardRef = card.current.getBoundingClientRect();
//     const targetRect = target.current.getBoundingClientRect();

//     // 마우스 커서 위치를 기억
//     const shiftX = pageX - targetRect.left;
//     const shiftY = pageY - targetRect.top;

//     // 다음 좌표 갱신
//     let nextX = event.pageX - cardRef.left - shiftX;
//     let nextY = event.pageY - cardRef.top - shiftY;

//     // 카드 영역 밖으로는 나가지 못하도록 함
//     if (nextX < 0) nextX = 0;
//     if (nextY < 0) nextY = 0;
//     if (nextX > cardRef.width - targetRect.width)
//       nextX = cardRef.width - targetRect.width;
//     if (nextY > cardRef.height - targetRect.height)
//       nextY = cardRef.height - targetRect.height;

//     console.log(cardRef);
//     console.log(targetRect);
//     console.log(`pageX: ${pageX} pageY: ${pageY}`);
//     console.log(`event.pageX: ${event.pageX} pageY: ${event.pageY}`);
//     console.log(`shiftX: ${shiftX} shiftY: ${shiftY}`);
//     console.log(`nextX: ${nextX} nextY: ${nextY}`);
//     props.setStickerPos(selIndex, nextX, nextY);

//     setSelector({
//       ...selector,
//       index: selIndex,
//       x: nextX - padding / 2,
//       y: nextY - padding / 2,
//       display: "block",
//     });
//     pageX = event.pageX;
//     pageY = event.pageY;
//   }, []);

//   const handleDragStart = (event, index) => {
//     target.current = event.target;

//     // if (!target.current.classList.contains("sticker")) {
//     //   document.removeEventListener("mousemove", handleDrag);
//     //   return false;
//     // }

//     // 커서 위치를 구하기 위해 이동 전 좌표를 저장해둠
//     pageX = event.pageX;
//     pageY = event.pageY;
//     setSelIndex(index);
//     handleClick(event, selIndex);

//     handleDrag(event, index);
//     document.addEventListener("mousemove", handleDrag(event));

//     target.current.onmouseup = () => {
//       document.removeEventListener("mousemove", handleDrag(event));
//       target.current.onmouseup = null;
//     };
//   };

//   // const handleDragEnd = (event, index) => {
//   //   const cardRef = card.current.getBoundingClientRect();
//   //   const target = event.target.getBoundingClientRect();

//   //   // 마우스 커서 위치를 기억
//   //   const shiftX = pageX - target.left;
//   //   const shiftY = pageY - target.top;

//   //   // 다음 좌표 갱신
//   //   let nextX = event.pageX - cardRef.left - shiftX;
//   //   let nextY = event.pageY - cardRef.top - shiftY;

//   //   // 카드 영역 밖으로는 나가지 못하도록 함
//   //   if (nextX < 0) nextX = 0;
//   //   if (nextY < 0) nextY = 0;
//   //   if (nextX > cardRef.width - target.width)
//   //     nextX = cardRef.width - target.width;
//   //   if (nextY > cardRef.height - target.height)
//   //     nextY = cardRef.height - target.height;

//   //   props.setStickerPos(index, nextX, nextY);
//   //   pageX = event.pageX;
//   //   pageY = event.pageY;
//   // };

//   const handleClick = (event, index) => {
//     console.log(selIndex + " " + index);
//     const padding = 50;
//     // const width = event.currentTarget.offsetWidth + padding;
//     // const height = event.currentTarget.offsetHeight + padding;
//     const width = props.stickers[index].width + padding;
//     const height = props.stickers[index].height + padding;
//     const y = props.stickers[index].y - padding / 2;
//     const x = props.stickers[index].x - padding / 2;
//     setSelector({ width, height, y, x, display: "block" });
//   };

//   const removeSticker = () => {
//     props.removeSticker(selIndex);
//     setSelector({ ...selector, display: "none" });
//   };

//   return (
//     <Card Card background={props.background} ref={card}>
//       {/* {props.stickers.map((sticker, index) => (
//         <Sticker
//           key={index}
//           sticker={sticker}
//           draggable
//           onDragStart={(event) => handleDragStart(event, index)}
//           onDragEnd={(event) => handleDragEnd(event, index)}
//           onClick={(event) => handleClick(event, index)}
//         >
//           {sticker.id}
//         </Sticker>
//       ))} */}
//       {props.stickers.map((sticker, index) => (
//         <Sticker
//           key={index}
//           ref={target}
//           sticker={sticker}
//           onDragStart={() => false}
//           onMouseDown={(event) => handleDragStart(event, index)}
//           // onMouseMove={(event) => handleDragEnd(event, index)}
//           // onMouseUp={(event) => handleDragEnd(event, index)}
//           onClick={(event) => handleClick(event, index)}
//         >
//           {/* {sticker.id} */}
//         </Sticker>
//       ))}
//       <Selector selector={selector}>
//         <div onClick={removeSticker}>X</div>
//       </Selector>
//       {props.text.isVisible ? props.text.message : null}
//     </Card>
//   );
// }

// const Card = styled.section`
//   background-color: ${(props) => props.background.color};
//   background-image: url(${(props) => props.background.image});
//   background-size: cover;
//   position: relative;
//   width: 300px;
//   height: 300px;
//   overflow: hidden;
// `;

// const Sticker = styled.div.attrs((props) => ({
//   style: {
//     position: "absolute",
//     top: `${props.sticker.y}px`,
//     left: `${props.sticker.x}px`,
//     width: `${props.sticker.width}px`,
//     height: `${props.sticker.height}px`,
//   },
//   className: "sticker",
// }))`
//   background-color: orange;
//   z-index: 1;
//   cursor: grab;
// `;

// const Selector = styled.div.attrs((props) => ({
//   style: {
//     position: "absolute",
//     top: `${props.selector.y}px`,
//     left: `${props.selector.x}px`,
//     width: `${props.selector.width}px`,
//     height: `${props.selector.height}px`,
//     display: props.selector.display,
//   },
// }))`
//   box-shadow: 0 0 0 1.5px gray inset;
//   position: absolute;

//   div {
//     background-color: skyblue;
//     border-radius: 50%;
//     position: absolute;
//     top: -15px;
//     right: -15px;
//     width: 30px;
//     height: 30px;
//     cursor: pointer;

//     text-align: center;
//     padding-top: 3px;
//   }
// `;
