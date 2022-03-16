import styled from "styled-components";
import { useState } from "react";
import { connect } from "react-redux";
import { setBackgroundColor } from "../../../store/actions/cardActions";

function mapDispatchToProps(dispatch) {
  return {
    setBackgroundColor: (color) => dispatch(setBackgroundColor(color)),
  };
}

export default connect(null, mapDispatchToProps)(Background);

function Background({ setBackgroundColor }) {
  const [colors] = useState([
    "transparent",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "hotpink",
    "black",
    "white",
    "gray",
  ]);

  const handleClick = (color) => {
    setBackgroundColor(color);
  };

  return (
    <Option>
      {colors.map((color) => (
        <Color key={color} color={color} onClick={() => handleClick(color)}>
          {color === "transparent" ? "투명" : null}
        </Color>
      ))}
    </Option>
  );
}

const Option = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 70px);
`;
const Color = styled.li`
  list-style: none;
  cursor: pointer;

  width: 50px;
  height: 50px;
  border-radius: 1rem;
  background-color: ${(props) => props.color};

  &:hover {
    border: 1px tomato solid;
  }
`;
