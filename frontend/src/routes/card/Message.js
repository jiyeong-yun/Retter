import { Link } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { setMessage } from "../../store/actions/cardActions";

function mapDispatchToProps(dispatch) {
  return {
    setMessage: (message) => dispatch(setMessage(message)),
  };
}

export default connect(null, mapDispatchToProps)(Message);

function Message({ setMessage }) {
  const [text, setText] = useState();
  const handleChange = ({ target: { value } }) => {
    setText(value);
  };

  const handleClick = () => {
    setMessage(text);
  };

  return (
    <main>
      메세지 입력
      <textarea value={text} onChange={handleChange}></textarea>
      <Link to="/card/edit">
        <button onClick={handleClick}>다음</button>
      </Link>
    </main>
  );
}
