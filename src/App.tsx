// Fahrplan
// 1. input field auslesen. ok
// 2. onclick bei button click mithilfe der API lat und long. ok
// 3. lat und long in anderem state speichern. ok
// 4. Haupt-Fetch. ok

import { useEffect, useState } from 'react';
import './App.css'
import IWeather from '../interfaces/IWeather';
import ILocation from '../interfaces/ILocation';

const apiKey = import.meta.env.VITE_API_KEY

function App() { 
  const [weatherData, setWeatherData] = useState<IWeather | null>(null)
  const [search, setSearch] = useState<string>("")
  const [location, setLocation] = useState<ILocation | null>(null)
  const [error, setError] = useState<string | null>(null) 

  const getLocation = () => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok'); // Netzwerkfehler
        }
        return response.json()
      })
      .then(data => {
        if (data.length === 0) {
          setError('Keine Stadt mit diesem Namen gefunden.'); // Stadt nicht gefunden
        } else {
          setLocation(data[0]);
          setError(null); // Fehler zurücksetzen
        }
      })
      .catch(() => setError('Fehler beim Abrufen der Ortsdaten.'));
  }  

  useEffect(() => {
    if (location) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok'); // Netzwerkfehler
          }
          return response.json()
        })
        .then((data: IWeather) => {
          if (!data) {
            setError('Keine Wetterdaten gefunden.'); // Daten nicht gefunden
          } else {
            setWeatherData(data);
            setError(null); // Fehler zurücksetzen
          }
        })
        .catch(() => setError('Fehler beim Abrufen der Wetterdaten.'));
    }
    setSearch("");
  }, [location])

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const getWeatherIcon = (iconCode: string) => { 
    switch(iconCode) { 
      case '01d': return '/icons/sun.png'; 
      case '01n': return '/icons/night.png'; 
      case '02d':
      case '02n': return '/icons/cloud.png';
      case '03d':
      case '03n': return '/icons/cloud.png';
      case '04d':
      case '04n': return '/icons/cloud.png';
      case '09d':
      case '09n': return '/icons/rain.png'; 
      case '10d':
      case '10n': return '/icons/rain.png'; 
      case '11d':
      case '11n': return '/icons/wind.png'; 
      case '13d':
      case '13n': return '/icons/frost.png'; 
      case '50d':
      case '50n': return '/icons/fog.png'; 
      default: return '/icons/thermometer.png'; 
    }
  };

  return (
    <section>
      <div className="searchbar">
        <input type='text' placeholder='Please enter a city' value={search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} />
        <button onClick={getLocation}>Search</button>
      </div>

      {error && <p className="error">{error}</p>} {/* Fehleranzeige */}

      {weatherData ? (
        <article className="weather-card">
          <div>
            <h2>{location?.name}</h2>
            <h1>{weatherData.main.temp.toFixed(0)}°</h1>
          </div>

          <div className="weather-info">
            {weatherData.weather.map((weatherInfo, index) => (
              <div key={index} className="weather-detail">
                <div className="vertical-text">
                  <h3>{weatherInfo.main}</h3>
                </div>
                <img src={getWeatherIcon(weatherInfo.icon)} alt={weatherInfo.description} />
              </div>
            ))}
          </div>

          <div className='sunrise-sunset'>
            <p>Sunrise {weatherData.sys.sunrise && formatTime(weatherData.sys.sunrise)} am</p>
            <p>Sunset {weatherData.sys.sunset && formatTime(weatherData.sys.sunset)} pm</p>
          </div>
        </article>
      ) : (
        <div className="intro-text">
          <h4>Daily Weather Service</h4>
        </div>
      )}
    </section>
  );
}

export default App;