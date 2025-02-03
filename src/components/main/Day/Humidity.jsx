import { useState, useEffect, useContext } from "react";
import low from "../../../assets/icons/low-humidity.png";
import high from "../../../assets/icons/high-humidity.png";
import mid from "../../../assets/icons/mid-humidity.png";
import LocationContext from "../../../context/LocationContext";

const getHumidityStatus = (value) => {
  if (value < 30) return { status: "Low", icon: low };
  if (value >= 30 && value <= 60) return { status: "Medium", icon: mid };
  return { status: "High", icon: high };
};

const Humidity = () => {
  const { weather, isLoading } = useContext(LocationContext);
  const humidity = weather?.current?.humidity || 0;
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const target = humidity;
    const interval = setInterval(() => {
      setAnimatedValue((prev) => {
        if (prev < target) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return target;
        }
      });
    }, 15);

    return () => clearInterval(interval);
  }, [humidity]);

  const { status: humidityStatus, icon: humidityIcon } = getHumidityStatus(humidity);

  return (
    <section style={{ background: "white", position: "relative" }}>
      <h3>Humidity</h3>
      {isLoading && (
        <div className="loader-wrapper">
          <span className="loader"></span>
        </div>
      )}
      <div style={{ filter: isLoading ? "blur(2px)" : "none" }}>
        <div className="range-container">
          <p>
            <span>{animatedValue}</span>
            <span>%</span>
          </p>
          <div className="slider">
            <span
              style={{ bottom: `${(animatedValue * 75) / 100}%` }}
              className="thumb"
            ></span>
          </div>
        </div>
        <p className="humidity-status">
          <span>{humidityStatus}</span>
          <img src={humidityIcon} alt={humidityStatus} />
        </p>
      </div>
    </section>
  );
};

export default Humidity;
