import styled from "styled-components";
import { connect } from "react-redux";
import { useCallback, useState } from "react";
import { addSticker } from "../../../store/actions/cardActions";

function mapDispatchToProps(dispatch) {
  return {
    addSticker: (id) => dispatch(addSticker(id)),
  };
}

export default connect(null, mapDispatchToProps)(StickerWindow);

function StickerWindow({ addSticker }) {
  const [stickers] = useState(
    Array.from({ length: 75 }, (value, index) => index + 1)
  );
  const handleClick = useCallback(
    (id) => {
      addSticker(id);
    },
    [addSticker]
  );

  return (
    <Container>
      <Option>
        {stickers.map((sticker, index) => (
          <Sticker
            key={index}
            index={index}
            onClick={() => handleClick(sticker)}
          ></Sticker>
        ))}
      </Option>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  position: relative;
  height: calc(100vh - 459.6px);
  padding: 0.5rem 0 1.7rem 0;
`;

const Option = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 70px);
  justify-content: center;

  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 1.25rem;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: rgba(0, 0, 0, 0.3);
    // background-clip: padding-box;
    border: 6px solid #eae2b1;
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;

const Sticker = styled.li`
  background: url("/images/stickers/${(props) => props.index + 1}.png") center
    no-repeat;
  background-size: contain;
  list-style: none;
  cursor: pointer;
  width: 50px;
  height: 50px;

  margin: 0.5rem;

  &:hover {
    transform: translateY(-3px);
    transition: 0.5s ease;
  }
`;
