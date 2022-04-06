import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components";

const minuteSeconds = 0;

const playaudio = () => {
  document.getElementById("player").play(); 
}
  



const timerProps = {
  isPlaying: true,
  size: 150,
  strokeWidth: 6
};

const renderTime = () => {
  return (
    <REC>
      <div className="time-wrapper">
        <div className="time">녹음버튼을</div>
        <div>눌러보세요</div>
      </div>
    </REC>
   
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;

function Record({audioUrl}) {
  return (
    <div>
      {audioUrl ? <audio id="player" style={{width:'50px',height:'50px'}} src={URL.createObjectURL(audioUrl)}/> : null}
      <CIRCLE>
        <CountdownCircleTimer
          {...timerProps}
          isPlaying
          duration={0}
          colors={['#218380', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[7, 5, 2, 0]}
        >
          {(color) => (
            <span >
              {audioUrl ? <img style={{cursor:"pointer"}} src="/images/playbutton.png" onClick={playaudio} alt="playbutton"/> : renderTime()}
            </span>
          )}
        </CountdownCircleTimer>
      </CIRCLE>
      <MESSAGE>
        녹음시간은 최대 20초입니다.
      </MESSAGE>
    </div>
  );
}

const CIRCLE = styled.div`
  display: flex;
  justify-content: center;
  margin: 2em;
`;

const MESSAGE = styled.p`
  display: flex;
  justify-content: center;
  font-family: 'Gowun Batang';
  font-weight: bold;
`;

const REC = styled.p`
  font-family: 'Gowun Batang';
  font-weight: bold;
`;
export default Record;