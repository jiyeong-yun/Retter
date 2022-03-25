import styled from "styled-components";
import { useState } from "react";
import { connect } from "react-redux";
import {
  setBackgroundColor,
  setBackgroundImage,
} from "../../../store/actions/cardActions";

function mapDispatchToProps(dispatch) {
  return {
    setBackgroundColor: (color) => dispatch(setBackgroundColor(color)),
    setBackgroundImage: (imageURL) => dispatch(setBackgroundImage(imageURL)),
  };
}

export default connect(null, mapDispatchToProps)(Background);

function Background({ setBackgroundColor, setBackgroundImage }) {
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

  const setImageURL = (event) => {
    const reader = new FileReader();
    console.log(event.target.files);
    console.log(reader);
    reader.onload = () => setBackgroundImage(reader.result);
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <Option>
      <ImageInput htmlFor="image">
        배경 이미지 추가
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={setImageURL}
        ></input>
      </ImageInput>

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
const ImageInput = styled.label`
  cursor: pointer;
  input {
    display: none;
  }
`;
