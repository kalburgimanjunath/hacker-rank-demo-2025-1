import React, { useEffect, useRef, useState } from "react";

interface Styles {
  container: React.CSSProperties;
  title: React.CSSProperties;
  inputSection: React.CSSProperties;
  input: React.CSSProperties;
  timer: React.CSSProperties;
  controls: React.CSSProperties;
  button: React.CSSProperties;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

const Timer: React.FC = () => {
  const [inputMinutes, setInputMinutes] = useState(1); // default 1 min
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // ✅ Fixed type for Node.js/TypeScript

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      alert("⏰ Time is up!");
      setIsRunning(false);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleStartPause = () => {
    if (timeLeft > 0) setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(inputMinutes * 60);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const mins = parseInt(value, 10);
    if (!isNaN(mins) && mins > 0) {
      setInputMinutes(mins);
      setTimeLeft(mins * 60);
      setIsRunning(false);
    }
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

const styles: Styles = {
  container: {
    fontFamily: "Arial",
    marginTop: "50px",
    textAlign: "center",
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
