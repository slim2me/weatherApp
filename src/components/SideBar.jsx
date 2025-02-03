import lens from "../assets/icons/glass.png";
import unknown from "../assets/icons/unknown.png";
import rain from "../assets/icons/rain.png";
import cloud from "../assets/icons/cloud.png";
import LocationContext from "../context/LocationContext";
import { useContext } from "react";
import "../assets/style/sideBar.css";

const SideBar = () => {
  const { weather, searchInput, selectCity, flag, isLoading, error, degree } =
    useContext(LocationContext);

  const date = new Date(weather ? weather?.location?.localtime : Date.now());

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Extract the day name, hours, and minutes
  const day = dayNames[date.getDay()]; // Get the day name
  const hours = date.getHours(); // Hours
  const minutes = date.getMinutes(); // Minutes

  return (
    <aside>
      <section className="aside-content">
        {/* Search Bar */}
        <div className="postion">
          <div className="search-container">
            <img src={lens} alt="glass" className="search-icon" width={16} />
            <input
              type="text"
              style={{ borderBottom: error ? "1px solid red" : "none" }}
              placeholder={error ? "City not found !" : "City name..."}
              className="search-input"
              ref={searchInput}
            />
          </div>

          <div className="gps" onClick={selectCity}>
            <button>Search</button>
          </div>
        </div>

        {/* Weather Icon */}
        {isLoading && (
          <div className="loader-wrapper">
            <span className="loader"></span>
          </div>
        )}
        <section style={{ filter: isLoading ? "blur(2px)" : "none" }}>
          <div>
            <img
              src={
                weather
                  ? weather.current.condition.icon.replace("64x64", "128x128")
                  : unknown
              }
              alt="weather"
              width={128}
              className="weather-image"
            />
          </div>

          {/* Temperature and Time Info */}
          <div>
            <p className="degree">
              <>
                <span className="number">
                  {degree === "Celsius"
                    ? weather?.current?.temp_c | 0
                    : weather?.current?.temp_f | 0}
                </span>
                <span className="unit">{degree === "Celsius" ? "°C" : "°F"}</span>
              </>
            </p>
            <p className="time-info">
              <>
                <span className="day">{day},&nbsp;</span>
                <span className="time">{hours + ":" + minutes}</span>
              </>
            </p>
          </div>

          {/* Cloud and Rain Info */}
          <div className="cloud-rain-container">
            {/* Cloud Info */}
            <div className="cloud">
              <img src={cloud} alt="cloud" />
              <div className="condition-icon">
                <span>
                  {weather ? weather?.current.condition.text : "Unknown"}
                </span>
              </div>
            </div>

            {/* Rain Info */}
            <div className="rain">
              <img width={32} src={rain} alt="rain" />
              <div className="condition-icon">
                <span>
                  {weather ? weather?.current.precip_mm + " mm" : "Unknown"}
                </span>
              </div>
            </div>
          </div>

          {/* City and Flag Info */}
          <div className="cityImage">
            <img
              src={flag || "https://placehold.co/200x100"}
              style={{ borderRadius: "1rem" }}
              alt="city"
            />

            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "1rem",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textTransform: "capitalize",
                fontSize: "1.4rem",
              }}
            >
              {weather
                ? `${weather?.location?.name} , ${weather?.location.country}`
                : "Unknown"}
            </div>
          </div>
        </section>
      </section>
    </aside>
  );
};

export default SideBar;
