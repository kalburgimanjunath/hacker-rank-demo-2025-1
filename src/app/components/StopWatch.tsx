import React, { useEffect, useRef, useState } from "react";

const formatTime = (ms) => {
  const minutes = Math.floor(ms / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const milliseconds = Math.floor((ms % 1000) / 10)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}:${milliseconds}`;
};

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // update every 10ms
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startStop = () => setIsRunning((prev) => !prev);
  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⏱ Stopwatch</h1>
      <div style={styles.display}>{formatTime(time)}</div>
      <div style={styles.controls}>
        <button onClick={startStop} style={styles.button}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={reset} style={styles.button} disabled={time === 0}>
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
  display: {
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

export default Stopwatch;
