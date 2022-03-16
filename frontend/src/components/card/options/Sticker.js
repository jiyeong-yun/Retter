import styled from "styled-components";
import { connect } from "react-redux";
import { useState } from "react";
import { addSticker } from "../../../store/actions/cardActions";

function mapDispatchToProps(dispatch) {
  return {
    addSticker: (id) => dispatch(addSticker(id)),
  };
}

export default connect(null, mapDispatchToProps)(StickerWindow);

function StickerWindow({ addSticker }) {
  const [stickers] = useState([1, 2, 3]);
  const handleClick = (id) => {
    addSticker(id);
  };

  return (
    <Option>
      {stickers.map((sticker, index) => (
        <Sticker key={index} onClick={() => handleClick(sticker)}>
          {sticker}번 스티커
        </Sticker>
      ))}
    </Option>
  );
}

const Option = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 70px);
`;

const Sticker = styled.li`
  list-style: none;
  cursor: pointer;

  &:hover {
      border 1px tomato solid;
  }
`;
