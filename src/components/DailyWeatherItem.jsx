const DailyWeatherItem = ({ dailyWeather }) => {
  const temperature = Math.floor(dailyWeather.temperature);
  const date = new Date(dailyWeather.date).toLocaleDateString("en-US", { weekday: "long" });

  return (
    <li className="hover-forecast">
      <p className="text-sm">{date}</p>
      <img src={`icons/${dailyWeather.weatherIcon}.svg`} className="weather-icon" alt={dailyWeather.description} />
      <p className="temperature">{temperature}°C</p>
      <p className="text-xs">{dailyWeather.description}</p>
    </li>
  );
};

export default DailyWeatherItem;
