import { connect } from "react-redux";
import {
  setTextIsVisible,
  setMenuStickerIsVisible,
  setMenuBackgroundIsVisible,
} from "../../store/actions/cardActions";
import Background from "./options/Background";
import Sticker from "./options/Sticker";
import styled from "styled-components";

function mapStateToProps({ cardReducer }) {
  return {
    isRecorded: cardReducer.isRecorded,
    menuVisible: cardReducer.menuVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTextIsVisible: () => dispatch(setTextIsVisible()),
    setMenuStickerIsVisible: () => dispatch(setMenuStickerIsVisible()),
    setMenuBackgroundIsVisible: () => dispatch(setMenuBackgroundIsVisible()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Options);

function Options({
  isRecorded,
  menuVisible,
  setTextIsVisible,
  setMenuStickerIsVisible,
  setMenuBackgroundIsVisible,
}) {
  const handleClick = (keyword) => {
    switch (keyword) {
      case "sticker":
        setMenuStickerIsVisible();
        break;
      case "background":
        setMenuBackgroundIsVisible();
        break;
      case "text":
        setTextIsVisible();
        break;
      default:
        break;
    }
  };

  return (
    <section>
      <nav style={{ width: "100vw" }}>
        <Menu>
          <Button onClick={() => handleClick("sticker")}>스티커</Button>
          <Button onClick={() => handleClick("background")}>배경</Button>
          {isRecorded ? null : (
            <Button onClick={() => handleClick("text")}>텍스트</Button>
          )}
        </Menu>
      </nav>
      {menuVisible.sticker ? <Sticker /> : null}
      {menuVisible.background ? <Background /> : null}
      {menuVisible.text ? null : null}
    </section>
  );
}

const Menu = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Button = styled.button`
  border: none;
  width: 80px;
  margin: 1rem;
  height: 30px;
  border-radius: 10px;
  background-color: #e7e7e7;
  box-shadow: 3px 3px #edb949;
  font-family: "Gowun Batang";
  font-weight: bold;
  font-size: 10pt;
  justify-content: right;
  cursor: pointer;
`;
