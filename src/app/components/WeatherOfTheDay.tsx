import React, { useEffect, useState } from "react";

type CurrentWeather = {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
};

const WeatherOfTheDay = () => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      // You can replace these coordinates with user’s location if needed
      const lat = 12.9716; // Bangalore latitude
      const lon = 77.5946; // Bangalore longitude
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

      const response = await fetch(url);
      const data = await response.json();
      setWeather(data.current_weather);
    } catch (err) {
      console.error("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌤 Weather of the Day</h1>
      {loading ? (
        <p>Loading...</p>
      ) : weather ? (
        <div style={styles.card}>
          <p>
            Temperature: <strong>{weather?.temperature}°C</strong>
          </p>
          <p>
            Wind Speed: <strong>{weather?.windspeed} km/h</strong>
          </p>
          <p>
            Weather Code: <strong>{weather?.weathercode}</strong>
          </p>
          <p>
            Time: <strong>{weather?.time}</strong>
          </p>
        </div>
      ) : (
        <p>Unable to load weather data.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial",
    marginTop: "50px",
  },
  title: {
    fontSize: "2em",
    marginBottom: "20px",
  },
  card: {
    fontSize: "1.2em",
    background: "#eef6fd",
    padding: "20px",
    borderRadius: "10px",
    display: "inline-block",
  },
};

export default WeatherOfTheDay;
