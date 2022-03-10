import { Link } from "react-router-dom";
import { useState } from "react";
export default function Message() {
  const [text, setText] = useState();
  const handleChange = ({ target: { value } }) => {
    setText(value);
  };

  return (
    <main>
      메세지 입력
      <textarea value={text} onChange={handleChange}></textarea>
      <Link to="/card/edit">
        <button onClick={() => console.log(text)}>다음</button>
      </Link>
    </main>
  );
}
