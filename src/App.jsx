import axios from "axios";
import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeatherItem from "./components/DailyWeatherItem";
import { weatherCodes } from "./constants";
import { useEffect, useRef } from "react";
import NoResultsDiv from "./components/NoResultDiv";
import { useWeather } from "./context/weatherContext";

const App = () => {

  const { currentWeather, dailyForecasts, hasNoResults, setHasNoResults, setCurrentWeather, setDailyForecasts } = useWeather()
  const searchInputRef = useRef(null);
  const API_KEY = "16b5ef0437db47de88a174522250802";

  // const filterHourlyForecast = (hourlyData) => {
  //   const currentHour = new Date().setMinutes(0, 0, 0);
  //   const next24Hours = currentHour + 24 * 60 * 60 * 1000;
  //   const next24HoursData = hourlyData.filter(({ time }) => {
  //     const forecastTime = new Date(time).getTime();
  //     return forecastTime >= currentHour && forecastTime <= next24Hours;
  //   });
  //   setHourlyForecasts(next24HoursData); 
  // };

  const filterDailyForecast = (forecastData) => {
    const next5DaysData = forecastData.map((day) => ({
      date: day.date,
      temperature: Math.floor(day.day.avgtemp_c),
      description: day.day.condition.text,
      weatherIcon: Object.keys(weatherCodes).find((icon) => weatherCodes[icon].includes(day.day.condition.code)),
    }));
    setDailyForecasts(next5DaysData);
  };

  const getWeatherDetails = async (API_URL) => {
    setHasNoResults(false);
    window.innerWidth <= 768 && searchInputRef.current.blur();
    try {
      const response = await axios.get(API_URL);
      const data = response.data;
      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find((icon) => weatherCodes[icon].includes(data.current.condition.code));
      setCurrentWeather({ temperature, description, weatherIcon });
      // const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];
      filterDailyForecast(data.forecast.forecastday);1
      searchInputRef.current.value = data.location.name;
    } catch {
      setHasNoResults(true);
    }
  };

  useEffect(() => {
    const defaultCity = "London";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=5`;
    getWeatherDetails(API_URL);
  }, []);

  return (
    <div className="container">
      <SearchSection getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef} />
      {hasNoResults ? (
        <NoResultsDiv />
      ) : (
        <div className="weather-section">
          <CurrentWeather currentWeather={currentWeather} />
          <div className="hourly-forecast">
            <ul className="weather-list">
              {dailyForecasts.map((itm,index) => (
                <DailyWeatherItem key={index} dailyWeather={itm} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;