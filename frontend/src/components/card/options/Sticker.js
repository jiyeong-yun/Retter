import styled from "styled-components";
import { connect } from "react-redux";
import { useCallback, useEffect, useState } from "react";
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
    <div style={{ width: "100vw" }}>
      <Option>
        {stickers.map((sticker, index) => (
          <Sticker
            key={index}
            index={index}
            onClick={() => handleClick(sticker)}
          ></Sticker>
        ))}
      </Option>
    </div>
  );
}

const Option = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 70px);

  justify-content: center;
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
