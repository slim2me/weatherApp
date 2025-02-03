import { useContext } from "react";
import windDirection from "../../../assets/icons/direction.png";
import LocationContext from "../../../context/LocationContext";
const WindStatus = () => {
  const { weather, isLoading } = useContext(LocationContext);
  const direction = weather?.current?.wind_degree || 0;
  return (
    <section
      style={{ background: "white", position: "relative" }}
      className="wind-status"
    >
      <h3>Wind Status</h3>
      {isLoading && (
        <div className="loader-wrapper">
          <span className="loader"></span>
        </div>
      )}
    
        <p className="speed"  style={{ filter: isLoading ? "blur(2px)" : "none" }}>
          <span className="speed-value">
            {weather?.current?.wind_kph || 0}&nbsp;
          </span>
          <span className="speed-unit">Km/h</span>
        </p>
        <p className="direction"  style={{ filter: isLoading ? "blur(2px)" : "none" }}>
          <img
            style={{
              transform: `rotate(${direction}deg)`,
              transition: "transform 0.5s ease",
            }}
            className="direction-icon"
            width={32}
            src={windDirection}
            alt="Wind Direction"
          />
          <span className="direction-value">
            {weather?.current?.wind_dir || "Unknown"}
          </span>
        </p>
   
    </section>
  );
};
export default WindStatus;
