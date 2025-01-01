# Weather App

This React-based weather application provides current weather data for cities around the world. By entering a city name, users receive an immediate overview of the current weather, including temperature, weather conditions, and sunrise/sunset times.


## Features
- Search for any city worldwide
- Display current temperature, weather conditions, and weather icons
- Show sunrise and sunset times
- Error handling for better user experience


## Technologies Used
- React
- TypeScript
- CSS
- OpenWeatherMap API


## Code Overview
### App.tsx 
 The main component of the application, responsible for fetching and displaying weather data. 
 Key functions include:
- getLocation(): Fetches latitude and longitude for the searched city.
- useEffect(): Fetches weather data based on the obtained latitude and longitude.
- formatTime(): Converts Unix timestamp to readable time format.
- getWeatherIcon(): Returns the appropriate weather icon based on the weather condition code.

### App.css 
 Contains the styles for the application, ensuring a visually appealing and responsive design that is deliberately streamlined and minimalistic to convey a calm, uncluttered atmosphere.


## Usage
Enter the name of a city in the search bar and click the "Search" button.

The app will fetch and display the current weather data for the specified city, including temperature, weather conditions, and weather icons.

Sunrise and sunset times for the city are also shown.


## Link to App & Preview
To the App: https://daily-weather-forecast-react.netlify.app/

![screenshot](/public/img/weather-app-preview.png)