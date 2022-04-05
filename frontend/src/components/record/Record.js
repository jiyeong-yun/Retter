import React, { useState } from "react";
import RecordTimer from "./RecordTimer";
import RecordTimer0 from "./RecordTimer0";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
// import { style } from "@mui/system";
const AudioRecord = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  // console.log(onRec)
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        // 20초 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 21) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      console.log(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();
    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
  };

  
  // const onSubmitAudioFile = useCallback((e) => {
  //   if (audioUrl) {
  //     console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
  //   }
  //   // File 생성자를 사용해 파일로 변환
  //   const sound = new File([audioUrl], "soundBlob", { lastModified: new Date().getTime(), type: "audio" });
  //   console.log(sound); // File 정보 출력
  // }, [audioUrl]);
  
  
  // file 정보 서버로
  const navigate = useNavigate();
  const handleClick = () => {
    const form = new FormData();
    const sound = new File([audioUrl], "audio.webm", { lastModified: new Date().getTime(), type: "audio/webm;codecs=opus" });
    form.append("file_name", sound);
    axios
    .post(`http://127.0.0.1:8000/api/record/`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      console.log(response)
      navigate("/card/edit");
    })
      .catch((error) => {
        console.log(error)
        alert("목소리를 녹음해주세요!")
      });
    };
    
    // //
    // const handleChange = ({ target: { value } }) =>{
    //   onSubmitAudioFile(value);
    // }


  // //
  // function UploadForm(props) {
  //   return(
  //     <div>
  //       <input type="file" name="docx" onChange={setFile.bind(this)} />
  //       <input type="button" onClick={postFile} value="Upload" />
  //     </div>
  //   )
  //   function postFile(event) {   
  //     // HTTP POST  
  //   }
  //   function setFile(event) {
  //     // Get the details of the files
  //     console.log(event.target.files)
  //   }
  // }


  return (
    <div>
      <RECORD>
        {onRec === false ? <RecordTimer /> : <RecordTimer0 audioUrl={audioUrl} />}
        {/* {audioUrl ? <audio  src={URL.createObjectURL(audioUrl)} controls="controls" /> : null} */}
      </RECORD>
      <div>
        <BUTTONS1>
          {onRec === false? <img src="/images/stop.png" alt="mic" onClick={onRec ? onRecAudio : offRecAudio}></img> :
                            <img src="/images/mic.png" alt="recording" onClick={onRec ? onRecAudio : offRecAudio}></img>  }
        </BUTTONS1>
        <BUTTONS2>
          <NEXTBUTTON onClick={handleClick}>다음</NEXTBUTTON>
        </BUTTONS2>
      </div>
    </div>
  );
};

const RECORD = styled.div`
  margin: 3em;
`;
	
const BUTTONS1 = styled.div`
  justify-content:center;
  display: flex;
`
	
const BUTTONS2 = styled.div`
  display: flex;
  justify-content: center;
  margin-top : 1em;
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
export default AudioRecord;
