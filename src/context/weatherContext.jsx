import { createContext, useContext, useState } from "react";
const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [dailyForecasts, setDailyForecasts] = useState([]);
  const [hasNoResults, setHasNoResults] = useState(false);

  return (
    <WeatherContext.Provider value={{ currentWeather, dailyForecasts, setDailyForecasts, hasNoResults, setHasNoResults, setCurrentWeather}}>
      {children}
    </WeatherContext.Provider>
  );
};
export const useWeather = () => useContext(WeatherContext);