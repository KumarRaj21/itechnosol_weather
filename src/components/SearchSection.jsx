import { GoSearch } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";

const SearchSection = ({ getWeatherDetails, searchInputRef }) => {
    const API_KEY = "16b5ef0437db47de88a174522250802";
    const handleCitySearch = (e) => {
      e.preventDefault();
      const input = e.target.querySelector(".search-input");
      const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${input.value}&days=5`;
      getWeatherDetails(API_URL);
    };
    const handleLocationSearch = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=5`;
          getWeatherDetails(API_URL);
          window.innerWidth >= 768 && searchInputRef.current.focus();
        },
        () => {
          alert("Location access denied. Please enable permissions to use this feature.");
        }
      );
    };
    return (
      <div className="search-section">
        <form action="#" className="search-form" onSubmit={handleCitySearch}>
          <span className="material-symbols-rounded">
            <GoSearch size={24}/>
          </span>
          <input type="search" placeholder="Enter a city name" className="search-input" ref={searchInputRef} required />
        </form>
        <button className="location-button" onClick={handleLocationSearch}>
          <span className="material-symbols-rounded">
            <FaLocationDot/>
          </span>
        </button>
      </div>
    );
  };
  export default SearchSection;