import { connect } from "react-redux";
import {
  setTextIsVisible,
  setMenuStickerIsVisible,
  setMenuBackgroundIsVisible,
} from "../../store/actions/cardActions";
import Background from "./options/Background";
import Sticker from "./options/Sticker";

function mapStateToProps({ cardReducer }) {
  return {
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
      <nav>
        <ul>
          <li onClick={() => handleClick("sticker")}>스티커</li>
          <li onClick={() => handleClick("background")}>배경</li>
          <li onClick={() => handleClick("text")}>텍스트</li>
        </ul>
      </nav>
      {menuVisible.sticker ? <Sticker /> : null}
      {menuVisible.background ? <Background /> : null}
      {menuVisible.text ? null : null}
    </section>
  );
}
