import { useState } from "react";
import { connect } from "react-redux";
import { setMessage, setCardID } from "../../store/actions/cardActions";
import { useNavigate } from "react-router-dom";
import { sendMessage } from "../../api/message";
import styled from "styled-components";
import { NoEncryption } from "@mui/icons-material";
function mapDispatchToProps(dispatch) {
  return {
    setMessage: (message) => dispatch(setMessage(message)),
    setCardID: (id) => dispatch(setCardID(id)),
  };
}

export default connect(null, mapDispatchToProps)(Message);

const playSample = (voice) => {
  document.getElementById(`sampleaudio${voice}`).play();
}
function Message({ setMessage, setCardID }) {
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
        setCardID(data.card_id);
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
    <main style={{width:'100vw',height:'100vh'}}>
      <audio id="sampleaudio1" src="/audios/sample1.wav"></audio>
      <audio id="sampleaudio2" src="/audios/sample2.wav"></audio>
      <TITLE2>
        음성메세지 만들기
      </TITLE2>
      <TITLE>
        ※Re:tter는 한글, 숫자만 지원해요
      </TITLE>
      <TEXTAREA_OUT>
        <TEXTAREA1
          value={text}
          maxLength="100"
          onChange={handleChange}
          placeholder="목소리를 입힐 메세지를 입력해주세요!"
        ></TEXTAREA1>
      </TEXTAREA_OUT>
      <TEXTUL>
        <li>{voice}번째 음성 선택 중</li>
      </TEXTUL>

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
      <NONDOTUL1>
        {voices.map((voice) => (
          <li key={voice} onClick={() => setVoice(voice)}>
            음성 {voice}
          </li>
        ))}
      </NONDOTUL1>
      <NONDOTUL2>
        {voices.map((voice) => (
          <li key={voice} onClick={() => setVoice(voice)}>
            <img src={`/images/model${voice}.png`} alt="model"></img>
          </li>
        ))}
      </NONDOTUL2>
      <NONDOTUL3>
        {voices.map((voice) => (
          <li key={voice} onClick={() => playSample(voice)}>
            <img src="/images/sampleplay.png" alt="sampleplay"></img>
          </li>
        ))}
      </NONDOTUL3>
      <NAV>
        <NEXTBUTTON onClick={checkMessage}>카드 만들기</NEXTBUTTON>
      </NAV>
    </main>
  );
}


const TITLE2 = styled.h1`
  text-align : center;
  margin : 2em;
  font-size: 2em;
`;
const TITLE = styled.h2`
  text-align : center;

`;
const TEXTAREA1 = styled.textarea`
  width : 90%;
  height : 10em;
  border: none;
  display: flex;
  justify-content: center;
  outline:none ;
  cursor: pointer;
`;

const TEXTAREA_OUT = styled.div`
  display: flex;
  justify-content: center;
  margin : 1em 2em 2em;
  
`

const NONDOTUL1 = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  margin: auto;
`
const NONDOTUL2 = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  margin: auto;
`
const NONDOTUL3 = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  margin: auto;
`

const NAV = styled.div`
  display: flex;
  justify-content: center;

`
const TEXTUL = styled.ul`
  list-style: none;
  text-align : center;
`
const NEXTBUTTON = styled.button`
  box-sizing: border-box;
  appearance: none;
  background-color: transparent;
  border: 2px solid $red;
  border-radius: 0.6em;
  color: $red;
  cursor: pointer;
  display: flex;
  align-self: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  margin: 20px;
  padding: 1.2em 2.8em;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  background: #f1c40f;
  border-color: #f1c40f;
  color: #fff;
  background: {
    image: linear-gradient(45deg,#f1c40f 50%, transparent 50%);
    position: 100%;
    size: 400%;
  }
  transition: background 300ms ease-in-out;

  &:hover {
    background-position: 0;
  &:hover,
  &:focus {
    color: #fff;
    outline: 0
  }
`
