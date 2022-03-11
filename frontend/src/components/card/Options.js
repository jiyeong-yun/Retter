import { connect } from "react-redux";
import { setTextIsVisible } from "../../store/actions/cardActions";

function mapDispatchToProps(dispatch) {
  return {
    setTextIsVisible: () => dispatch(setTextIsVisible()),
  };
}

export default connect(null, mapDispatchToProps)(Options);

function Options({ setTextIsVisible }) {
  const handleClick = (keyword) => {
    switch (keyword) {
      case "text":
        setTextIsVisible();
        break;
      default:
        break;
    }
  };
  return (
    <nav>
      <ul>
        <li>스티커</li>
        <li>배경</li>
        <li onClick={() => handleClick("text")}>텍스트</li>
      </ul>
    </nav>
  );
}
