import React, { useEffect, useRef, useState } from "react";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

const Timer = () => {
  const [inputMinutes, setInputMinutes] = useState(1); // default 1 min
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      alert("⏰ Time is up!");
      setIsRunning(false);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const handleStartPause = () => {
    if (timeLeft > 0) setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(inputMinutes * 60);
  };

  const handleInputChange = (e) => {
    const mins = parseInt(e.target.value, 10);
    setInputMinutes(mins);
    setTimeLeft(mins * 60);
    setIsRunning(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⏳ Timer</h1>
      <div style={styles.inputSection}>
        <label>
          Minutes:
          <input
            type="number"
            min="1"
            value={inputMinutes}
            onChange={handleInputChange}
            style={styles.input}
            disabled={isRunning}
          />
        </label>
      </div>
      <div style={styles.timer}>{formatTime(timeLeft)}</div>
      <div style={styles.controls}>
        <button onClick={handleStartPause} style={styles.button}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          style={styles.button}
          disabled={timeLeft === inputMinutes * 60 && !isRunning}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial",
    textAlign: "center",
    marginTop: "50px",
  },
  title: {
    fontSize: "2em",
    marginBottom: "20px",
  },
  inputSection: {
    fontSize: "1.2em",
    marginBottom: "20px",
  },
  input: {
    marginLeft: "10px",
    padding: "5px",
    fontSize: "1em",
    width: "60px",
  },
  timer: {
    fontSize: "3em",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1em",
    cursor: "pointer",
  },
};

export default Timer;
