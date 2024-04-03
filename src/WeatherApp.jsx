import  { useState } from 'react';
import './WeatherApp.css';

export const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = 'c0727e2a4ab36eaba0f7ad0ef420ee92';
  const useKelvin = 273.15;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeatherData(data);
      setCity('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="container">
      <h1>Aplicación del clima</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese nombre de una ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Obtener Clima</button>
      </form>

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {Math.round(weatherData.main.temp - useKelvin)}°C</p>
          <p>Descripción: {weatherData.weather[0].description}</p>
          <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
            />

          <p>Humedad: {weatherData.main.humidity}%</p>
          <p>Viento: {weatherData.wind.speed} m/s</p>
          <p>Presión: {weatherData.main.pressure} hPa</p>
          <p>Nubes: {weatherData.clouds.all}%</p>
        </div>
      )}
    </div>
  );
};
