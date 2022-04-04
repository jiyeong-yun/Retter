import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components";
const minuteSeconds = 0;

const timerProps = {
  isPlaying: true,
  size: 150,
  strokeWidth: 6
};

const renderTime = () => {
  return (
    <div className="time-wrapper">
      <div className="time">녹음버튼을</div>
      <div>눌러보세요</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;

function Record() {
  return (
    <div>
      <CIRCLE>
        <CountdownCircleTimer
          {...timerProps}
          isPlaying
          duration={0}
          colors={['#218380', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[7, 5, 2, 0]}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime("seconds", getTimeSeconds(elapsedTime))}
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

`;
export default Record;