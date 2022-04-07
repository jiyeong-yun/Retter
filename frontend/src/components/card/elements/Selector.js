import styled from "styled-components";
import { connect } from "react-redux";
import { useEffect, useCallback } from "react";
import { removeSticker } from "../../../store/actions/cardActions";
import { setSelector } from "../../../store/actions/selectorActions";

function mapStateToProps({ selectorReducer }) {
  return {
    selector: selectorReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSelector: (nextSelector) => dispatch(setSelector(nextSelector)),
    removeSticker: (index) => dispatch(removeSticker(index)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);

function Selector({ index, selector, setSelector, removeSticker }) {
  const checkSelector = useCallback(
    (event) => {
      if (typeof event.target.className !== "string") return;

      if (!event.target.className.includes("element")) {
        setSelector({ display: "none" });
      }
    },
    [setSelector]
  );

  const removeSelector = useCallback(() => {
    removeSticker(index);
    setSelector({ display: "none" });
  }, [index, setSelector, removeSticker]);

  useEffect(() => {
    document.addEventListener("click", checkSelector);
    return () => {
      document.removeEventListener("click", checkSelector);
    };
  }, [checkSelector]);

  return (
    <Container selector={selector}>
      <CloseButton onClick={removeSelector} onTouchStart={removeSelector}>
        X
      </CloseButton>
      {/* <ModifyButton
          className="element"
          onMouseDown={(event) => onModifyStart(event)}
        >
          O
        </ModifyButton> */}
    </Container>
  );
}

const Container = styled.div.attrs((props) => ({
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
  background-color: gray;
  color: white;
  border-radius: 50%;
  position: absolute;
  width: 30px;
  height: 30px;
  cursor: pointer;

  text-align: center;
  padding-top: 6px;
`;

const CloseButton = styled(StickerButton)`
  top: -15px;
  right: -15px;
`;

// const ModifyButton = styled(StickerButton)`
//   bottom: -15px;
//   right: -15px;
// `;
