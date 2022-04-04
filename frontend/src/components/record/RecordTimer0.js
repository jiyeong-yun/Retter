import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 0;

const timerProps = {
  isPlaying: true,
  size: 120,
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
    <div className="Record">
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
      <p className="info">
        녹음시간은 최대 20초입니다.
      </p>
    </div>
  );
}

export default Record;