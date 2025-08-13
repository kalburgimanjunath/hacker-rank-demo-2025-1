"use client";
import React, { useState, useEffect } from "react";
import AlarmClock from "./AlarmCloth";
import Stopwatch from "./StopWatch";
import Timer from "./Timer";
import WeatherOfTheDay from "./WeatherOfTheDay";

const Orientation = () => {
  const [angle, setAngle] = useState(window.screen.orientation?.angle || 0);

  useEffect(() => {
    const getOrientationAngle = () => {
      if (typeof window !== "undefined" && window.screen.orientation) {
        return window.screen.orientation.angle;
      } else if (
        typeof window !== "undefined" &&
        typeof window.orientation === "number"
      ) {
        return window.orientation; // Fallback for iOS
      }
      return 0; // Default
    };

    const updateAngle = () => {
      const newAngle = getOrientationAngle();
      setAngle(newAngle);
    };

    updateAngle(); // Initial angle
    window.addEventListener("orientationchange", updateAngle);
    window.addEventListener("resize", updateAngle); // extra fallback

    return () => {
      window.removeEventListener("orientationchange", updateAngle);
      window.removeEventListener("resize", updateAngle);
    };
  }, []);

  const renderComponentByAngle = () => {
    switch (angle) {
      case 0:
        return <AlarmClock />;
      case 90:
        return <Stopwatch />;
      case 180:
        return <Timer />;
      case 270:
        return <WeatherOfTheDay />;
      default:
        return <h2>🔄 Rotate your device to see different components</h2>;
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {renderComponentByAngle()}
      <p style={{ fontSize: "14px", marginTop: "20px" }}>
        Current Orientation Angle: {angle}°
      </p>
    </div>
  );
};

export default Orientation;
