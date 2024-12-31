import { useEffect, useState } from 'react';
import './App.css'
import IWeather from '../interfaces/IWeather';
import ILocation from '../interfaces/ILocation';


// const apiLink = import.meta.env.VITE_API_LINK
const apiKey = import.meta.env.VITE_API_KEY

// Fahrplan
// 1. input field auslesen. ok
// 2. onclick bei button click mithilfe der API lat und long. ok
// 3. lat und long in anderem state speichern. ok
// 4. Haupt-Fetch. ok

function App() {
    
  const [weatherData, setWeatherData]=useState<IWeather | null>(null)
  const [search, setSearch]=useState<string>("")
  const [location, setLocation]=useState<ILocation | null>(null)

  const getLocation = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => setLocation(data[0]));
  }  

  useEffect(() => {
    if (location) {fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data: IWeather) => setWeatherData(data));
    setSearch("");
}
  },[location])
  console.log(weatherData);

  const formatTime = (timestamp: number) => {
    // Funktion zum Formatieren der Unix-Zeit. Umwandeln der Zeit in Millisekunden
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }


  const getWeatherIcon = (iconCode: string) => { switch(iconCode) { 
    case '01d': return '/src/assets/icons/sun.png'; 
    case '01n': return '/src/assets/icons/night.png'; 
    case '02d': case '02n': return '/src/assets/icons/cloud.png';
    case '03d': case '03n': return '/src/assets/icons/cloud.png';
    case '04d': case '04n': return '/src/assets/icons/cloud.png';
    case '09d': case '09n': return '/src/assets/icons/rain.png'; 
    case '10d': case '10n': return '/src/assets/icons/rain.png'; 
    case '11d': case '11n': return '/src/assets/icons/wind.png'; 
    case '13d': case '13n': return '/src/assets/icons/frost.png'; 
    case '50d': case '50n': return '/src/assets/icons/fog.png'; 
    default: return '/src/assets/icons/thermometer.png'; } };


  return (
    <section>
      {/* searchbar: input city + button */}
      <div className="searchbar">
        <input type='text' placeholder='Please enter a city' value={search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} />
        <button onClick={getLocation}>Search</button>
      </div>

      {/* Introduction text or weather card */}
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