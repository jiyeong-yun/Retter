import styled from "styled-components";
import { useState } from "react";
import { connect } from "react-redux";
import {
  setBackgroundColor,
  setBackgroundImage,
  removeBackground,
} from "../../../store/actions/cardActions";

function mapDispatchToProps(dispatch) {
  return {
    setBackgroundColor: (color) => dispatch(setBackgroundColor(color)),
    setBackgroundImage: (imageURL) => dispatch(setBackgroundImage(imageURL)),
    removeBackground: () => dispatch(removeBackground()),
  };
}

export default connect(null, mapDispatchToProps)(Background);

function Background({
  setBackgroundColor,
  setBackgroundImage,
  removeBackground,
}) {
  const [colors] = useState([
    "transparent",
    "#45BBA4",
    "#038DB2",
    "#206491",
    "#F9637C",
    "#FE7A66",
    "#FBB45C",
    "#6F5643",
  ]);

  const handleClick = (color) => {
    if (color === "transparent") removeBackground();
    else setBackgroundColor(color);
  };

  const handleChange = (event) => {
    if (!event.target.files[0]) return;

    const reader = new FileReader();
    reader.onload = () => setBackgroundImage(reader.result);
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <Option>
      <div style={{ width: "100wv" }}>
        <Menu>
          <ImageInput htmlFor="image">
            <img
              src="/images/plus.png"
              alt="plus"
              style={{ width: "35px", height: "35px" }}
            ></img>
            <input
              id="image"
              type="file"
              accept="image/*"
              onClick={(event) => {
                event.target.value = "";
              }}
              onChange={handleChange}
            ></input>
          </ImageInput>
        </Menu>

        <Palette>
          {colors.map((color) => (
            <Color key={color} color={color} onClick={() => handleClick(color)}>
              {color === "transparent" ? "삭제" : null}
            </Color>
          ))}
          <ColorPicker
            type="color"
            onChange={(event) => setBackgroundColor(event.target.value)}
          ></ColorPicker>
        </Palette>
      </div>
    </Option>
  );
}

const Option = styled.ul`
  justify-content: center;
  display: flex;
`;

const Menu = styled.div`
  justify-content: center;
  display: flex;
`;

const Palette = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 70px);
  row-gap: 0.5rem;
  justify-content: center;
`;

const Color = styled.li`
  list-style: none;
  cursor: pointer;

  margin: 0.2rem;
  width: 50px;
  height: 50px;
  border-radius: 1rem;
  background-color: ${(props) => props.color};

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  font-family: "Gowun Batang";
  font-weight: bold;

  &:hover {
    transform: translateY(-3px);
    transition: 0.5s ease;
  }
`;
const ImageInput = styled.label`
  cursor: pointer;
  margin-bottom: 0.5rem;
  input {
    display: none;
  }
`;

const ColorPicker = styled.input`
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  background: none;
  margin: 0.2rem;
  padding: 0;
  width: 50px;
  height: 50px;

  &::-webkit-color-swatch {
    border: none;
    border-radius: 1rem;
  }
  &::-moz-color-swatch {
    border: none;
    border-radius: 1rem;
  }

  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border: none;
  }
  &::-moz-color-swatch-wrapper {
    padding: 0;
    border: none;
  }

  &:hover {
    transform: translateY(-3px);
    transition: 0.5s ease;
  }
`;

// const DeleteButton = styled.button`
//   cursor: pointer;
//   border: none;
//   padding: 0.5rem 1rem;
//   &:hover {
//     background-color: lightgray;
//   }
// `;
