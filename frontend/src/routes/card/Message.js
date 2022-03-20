import { useState } from "react";
import { connect } from "react-redux";
import { setMessage } from "../../store/actions/cardActions";
import { useNavigate } from "react-router-dom";

function mapDispatchToProps(dispatch) {
  return {
    setMessage: (message) => dispatch(setMessage(message)),
  };
}

export default connect(null, mapDispatchToProps)(Message);

function Message({ setMessage }) {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const handleChange = ({ target: { value } }) => {
    setText(value);
  };

  const handleClick = () => {
    if (text === '') {
      alert("메세지를 입력해주세요!");
      return;
    }

    // 1. 영어 삭제
    // 아래 전처리된 문장이 서버로 보내지고, 사용자에게는 이 텍스트로만 보임
    const nextText = text.replace(/\w/g, '');
    setMessage(nextText);
    console.log(nextText);

    // 2. 서버로 전송할 메세지 전처리
    let preprocessedText = nextText.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|0-9|.?! ]/g, '');
    // 온점, 느낌표, 물음표 1개만 남김
    preprocessedText = preprocessedText.replace(/\.+/g, '.');
    preprocessedText = preprocessedText.replace(/!+/g, '!');
    preprocessedText = preprocessedText.replace(/\?+/g, '?');

    // todo: 서버로 메세지 보내는 로직 
    navigate('/card/edit');
  };

  return (
    <main>
      메세지 입력
      <textarea
        value={text}
        maxLength="100"
        onChange={handleChange}
        placeholder="메세지를 입력해주세요!"
      ></textarea>
      <ul>
        <li>Re:tter는 한글, 숫자만 지원해요. 영어 멈춰!! (메세지에 영어가 들어가면 자동으로 삭제됩니다.)</li>
      </ul>
      <button onClick={handleClick}>다음</button>
    </main>
  );
}
