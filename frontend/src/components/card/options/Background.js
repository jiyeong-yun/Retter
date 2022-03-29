import styled from "styled-components";
import { useState } from "react";
import { connect } from "react-redux";
import {
  setBackgroundColor,
  setBackgroundImage,
  removeBackgroundImage,
} from "../../../store/actions/cardActions";

function mapDispatchToProps(dispatch) {
  return {
    setBackgroundColor: (color) => dispatch(setBackgroundColor(color)),
    setBackgroundImage: (imageURL) => dispatch(setBackgroundImage(imageURL)),
    removeBackgroundImage: () => dispatch(removeBackgroundImage()),
  };
}

export default connect(null, mapDispatchToProps)(Background);

function Background({
  setBackgroundColor,
  setBackgroundImage,
  removeBackgroundImage,
}) {
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

  const handleChange = (event) => {
    if (!event.target.files[0]) return;

    const reader = new FileReader();
    reader.onload = () => setBackgroundImage(reader.result);
    reader.readAsDataURL(event.target.files[0]);
  };

  const deleteImage = () => {
    removeBackgroundImage();
  };

  return (
    <Option>
      <DeleteButton onClick={deleteImage}>배경 삭제</DeleteButton>
      <ImageInput htmlFor="image">
        배경 이미지 추가
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
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
const DeleteButton = styled.button`
  cursor: pointer;
  border: none;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: lightgray;
  }
`;
