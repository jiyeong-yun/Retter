import { connect } from "react-redux";
import {
  setTextIsVisible,
  setMenuStickerIsVisible,
  setMenuBackgroundIsVisible,
} from "../../store/actions/cardActions";
import OptionWindow from "./OptionWindow";

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
      {menuVisible.sticker ? <OptionWindow items={"sticker"} /> : null}
      {menuVisible.background ? <OptionWindow items={"background"} /> : null}
      {menuVisible.text ? <OptionWindow items={"text"} /> : null}
    </section>
  );
}
