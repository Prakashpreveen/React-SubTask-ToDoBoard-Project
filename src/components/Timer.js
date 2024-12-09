import React, { useState, useEffect } from "react";
import "./Timer.css"; // Optional: Create a CSS file for styling

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((prev) => prev - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          clearInterval(interval); // Stop when time is up
          setIsActive(false);
        }
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup on unmount
  }, [isActive, seconds, minutes, hours]);

  const handleStart = () => {
    if (hours > 0 || minutes > 0 || seconds > 0) {
      setIsActive(true);
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="timer">
      <h3>Timer</h3>
      <div className="time">
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </div>
      {!isActive && (
        <div className="controls">
          <div className="time-inputs">
            <div className="input-group">
              <span
                className="arrow"
                onClick={() => setHours((prev) => Math.max(prev - 1, 0))}
              >
                ↑
              </span>
              <span>{String(hours).padStart(2, "0")}</span>
              <span
                className="arrow"
                onClick={() => setHours((prev) => prev + 1)}
              >
                ↓
              </span>
            </div>
            <div className="input-group">
              <span
                className="arrow"
                onClick={() => setMinutes((prev) => Math.max(prev - 1, 0))}
              >
                ↑
              </span>
              <span>{String(minutes).padStart(2, "0")}</span>
              <span
                className="arrow"
                onClick={() => setMinutes((prev) => prev + 1)}
              >
                ↓
              </span>
            </div>
            <div className="input-group">
              <span
                className="arrow"
                onClick={() => setSeconds((prev) => Math.max(prev - 1, 0))}
              >
                ↑
              </span>
              <span>{String(seconds).padStart(2, "0")}</span>
              <span
                className="arrow"
                onClick={() => setSeconds((prev) => prev + 1)}
              >
                ↓
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="controls">
        {!isActive ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleReset}>Reset</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
