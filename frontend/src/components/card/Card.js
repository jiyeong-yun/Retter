import { connect } from "react-redux";
import styled from "styled-components";

function mapStateToProps({ cardReducer }) {
  return {
    text: cardReducer.text,
    background: cardReducer.background,
  };
}
export default connect(mapStateToProps)(CardComponent);
function CardComponent({ text, background }) {
  return (
    <Card color={background.color}>{text.isVisible ? text.message : null}</Card>
  );
}

const Card = styled.section`
  background-color: ${(props) => props.color};
`;
