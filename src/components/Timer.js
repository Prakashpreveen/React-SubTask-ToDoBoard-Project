import React, { useState, useEffect } from "react";
import "./Timer.css"; // Optional: Create a CSS file for styling
// import CustomPopup from "./CustomPopup"; // Import the CustomPopup component

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // State for popup visibility and message
  // const [showPopup, setShowPopup] = useState(false);
  // const [popupMessage, setPopupMessage] = useState(""); // To hold the message for popup

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
          // setShowPopup(true); // Show popup when time is up
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
    // setShowPopup(false); // Close popup on reset
    // setPopupMessage(""); // Clear message on reset
  };

  // const handleFinished = () => {
  //   setPopupMessage(<h2 style={{ color: "green" }}>WELLDONE !</h2>); // Set encouraging message
  //   // Optionally close the popup after a short delay
  //   setTimeout(() => {
  //     setShowPopup(false); // Close popup after showing message
  //     handleReset(); // Reset timer after closing popup
  //   }, 2000); // Adjust delay as needed
  // };

  // const handleNotFinished = () => {
  //   setPopupMessage(<h2 style={{ color: "red" }}>KEEP PUSHING !</h2>); // Set message for not finished
  //   // Optionally close the popup after a short delay
  //   setTimeout(() => {
  //     setShowPopup(false); // Close popup after showing message
  //     handleReset(); // Reset timer after closing popup
  //   }, 2000); // Adjust delay as needed
  // };

  const handleAddTime = () => {
    // Add extra time to the timer
    if (minutes + hours * 60 < 55) {
      // Ensure total time does not exceed a reasonable limit
      if (minutes + hours * 60 + 5 >= 60) {
        const newHours = Math.floor((minutes + hours * 60 + 5) / 60);
        const newMinutes = (minutes + hours * 60 + 5) % 60;
        setHours(hours + newHours);
        setMinutes(newMinutes);
      } else {
        setMinutes(minutes + 5);
      }
      // setShowPopup(false); // Close popup after adding time
    }
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
