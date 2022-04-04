import { useState } from "react";
import { connect } from "react-redux";
import {
  setMessage,
  setCardID,
  resetCard,
} from "../../store/actions/cardActions";
import { useNavigate } from "react-router-dom";
import { sendMessage } from "../../api/message";
import styled from "styled-components";
function mapDispatchToProps(dispatch) {
  return {
    setMessage: (message) => dispatch(setMessage(message)),
    setCardID: (id, audio) => dispatch(setCardID(id, audio)),
    resetCard: () => dispatch(resetCard()),
  };
}

export default connect(null, mapDispatchToProps)(Message);

function Message({ setMessage, setCardID, resetCard }) {
  const [text, setText] = useState("");
  const voices = [1, 2];
  // const [isVoiceVisible, setIsVoiceVisible] = useState(false);
  const [voice, setVoice] = useState(1);
  const navigate = useNavigate();
  const handleChange = ({ target: { value } }) => {
    setText(value);
  };

  const checkMessage = () => {
    if (text === "") {
      alert("메세지를 입력해주세요!");
      return;
    }

    // 1. 영어 삭제
    // 아래 전처리된 문장이 서버로 보내지고, 사용자에게는 이 텍스트로만 보임
    const nextText = text.replace(/\w/g, "");
    setMessage(nextText);

    // 2. 서버로 전송할 메세지 전처리
    let preprocessedText = preprocess(nextText);

    // todo: 서버로 메세지 보내는 로직
    const params = {
      voice_num: voice,
      text: preprocessedText,
    };

    sendMessage(
      params,
      ({ data }) => {
        resetCard();
        setCardID(data.card_id, data.audio);
      },
      (error) => console.log(error)
    );

    navigate("/card/edit");
  };

  const preprocess = (text) => {
    let nextText = text.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|0-9|.?! ]/g, "");
    // 온점, 느낌표, 물음표 1개만 남김
    nextText = nextText.replace(/\.+/g, ".");
    nextText = nextText.replace(/!+/g, "!");
    nextText = nextText.replace(/\?+/g, "?");

    return nextText;
  };

  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <TITLE>메세지를 입력하세요.</TITLE>
      <TEXTAREA_OUT>
        <TEXTAREA1
          value={text}
          maxLength="100"
          onChange={handleChange}
          placeholder="메세지를 입력해주세요!"
        ></TEXTAREA1>
      </TEXTAREA_OUT>
      <ul style={{ listStyle: "none" }}>
        <li>
          Re:tter는 한글, 숫자만 지원해요. (메세지에 영어가 들어가면 자동으로
          삭제됩니다.)
        </li>
        <li>{voice}번째 음성 선택 중</li>
      </ul>

      {/* {isVoiceVisible ? (
        <section>
          <ul>
            {voices.map((voice) => (
              <li key={voice} onClick={() => setVoice(voice)}>
                음성 {voice}
              </li>
            ))}
          </ul>
          <button onClick={() => setIsVoiceVisible(false)}>닫기</button>
        </section>
      ) : null} */}
      <NONDOTUL>
        {voices.map((voice) => (
          <li key={voice} onClick={() => setVoice(voice)}>
            음성 {voice}
          </li>
        ))}
      </NONDOTUL>
      <NONDOTUL>
        {voices.map((voice) => (
          <li key={voice} onClick={() => setVoice(voice)}>
            <img src={`/images/model${voice}.png`} alt="model"></img>
          </li>
        ))}
      </NONDOTUL>
      <NAV>
        {/* <button onClick={() => setIsVoiceVisible(true)}>음성 선택</button> */}
        <button onClick={checkMessage}>카드 만들기</button>
      </NAV>
    </main>
  );
}

const TITLE = styled.h2`
  text-align: center;
  margin: 0;
  padding: 2em;
`;
const TEXTAREA1 = styled.textarea`
  width: 90%;
  height: 9em;
  border: none;
  display: flex;
  justify-content: center;
`;

const TEXTAREA_OUT = styled.div`
  display: flex;
  justify-content: center;
  margin: 2em;
`;

const NONDOTUL = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  padding: 0;
`;

const NAV = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-right: 1em;
`;
