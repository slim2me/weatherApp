import { useState, useEffect, useContext } from "react";
import LocationContext from "../../../context/LocationContext";
import low from "../../../assets/icons/low-air-quality.png";
import mid from "../../../assets/icons/mid-air-quality.png";
import high from "../../../assets/icons/high-air-quality.png";
import veryHigh from "../../../assets/icons/very-high-air-quality.png"; // New icon for "Very Poor"

const getAirQuality = (value) => {
  if (value <= 2) return { status: "Good", icon: veryHigh };
  if (value === 3 || value === 4) return { status: "Moderate", icon: high };
  if (value === 5) return { status: "Poor", icon: mid };
  return { status: "Very Poor", icon: low }; // New status
};

const AirQuality = () => {
  const { weather, isLoading } = useContext(LocationContext);
  const airQualityIndex = weather?.current?.air_quality?.["us-epa-index"] || 0;
  const { status, icon } = getAirQuality(airQualityIndex);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const target = airQualityIndex;
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
  }, [airQualityIndex]);

  return (
    <section style={{ background: "white", position: "relative" }}>
      <h3>Air Quality</h3>
      {isLoading && (
        <div className="loader-wrapper">
          <span className="loader"></span>
        </div>
      )}
      <div style={{ filter: isLoading ? "blur(2px)" : "none" }}>
        <div className="range-container">
          <p>
            <span>{animatedValue}</span>
          </p>
          <div className="slider">
            <span
              style={{ bottom: `${(animatedValue * 75) / 6}%` }}
              className="thumb"
            ></span>
          </div>
        </div>
        <p className="air-quality-status">
          <span>{status}</span>
          <img src={icon} alt={status} />
        </p>
      </div>
    </section>
  );
};

export default AirQuality;
