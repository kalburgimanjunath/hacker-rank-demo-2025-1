import React, { useEffect, useState } from "react";

const AlarmClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmTriggered, setAlarmTriggered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const currentFormatted = now.toTimeString().slice(0, 5); // HH:MM
      if (alarmTime === currentFormatted && !alarmTriggered) {
        setAlarmTriggered(true);
        alert("⏰ Alarm! Wake up!");
        // Optionally play sound
        // new Audio('alarm.mp3').play();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [alarmTime, alarmTriggered]);

  const handleAlarmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlarmTime(e.target.value);
    setAlarmTriggered(false); // Reset on alarm change
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const mins = date.getMinutes().toString().padStart(2, "0");
    const secs = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${mins}:${secs}`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⏰ Alarm Clock</h1>
      <div style={styles.clock}>
        Current Time: <span style={styles.time}>{formatTime(currentTime)}</span>
      </div>
      <div style={styles.alarm}>
        Set Alarm Time:
        <input
          type="time"
          value={alarmTime}
          onChange={handleAlarmChange}
          style={styles.input}
        />
      </div>
      {alarmTriggered && <div style={styles.trigger}>🚨 Alarm Triggered!</div>}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial",
    textAlign: "center" as const,
    marginTop: "150px",
  },
  title: {
    fontSize: "2em",
    marginBottom: "20px",
  },
  clock: {
    fontSize: "1.5em",
    marginBottom: "20px",
  },
  time: {
    fontWeight: "bold",
  },
  alarm: {
    fontSize: "1.2em",
    marginBottom: "20px",
  },
  input: {
    marginLeft: "10px",
    padding: "5px",
    fontSize: "1em",
  },
  trigger: {
    marginTop: "20px",
    fontSize: "1.4em",
    color: "red",
    fontWeight: "bold",
  },
};

export default AlarmClock;
