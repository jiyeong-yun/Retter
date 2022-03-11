import { connect } from "react-redux";

function mapStateToProps({ cardReducer }) {
  return {
    text: cardReducer.text,
  };
}
export default connect(mapStateToProps)(Card);
function Card({ text }) {
  return <div id="card">{text.isVisible ? text.message : null}</div>;
}
