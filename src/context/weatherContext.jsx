import { createContext, useContext, useState } from "react";
const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);
  const [hasNoResults, setHasNoResults] = useState(false);

  return (
    <WeatherContext.Provider value={{ currentWeather, hourlyForecasts, hasNoResults, setHasNoResults, setCurrentWeather, setHourlyForecasts}}>
      {children}
    </WeatherContext.Provider>
  );
};
export const useWeather = () => useContext(WeatherContext);