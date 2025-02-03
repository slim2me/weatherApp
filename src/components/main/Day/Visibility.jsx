import { useContext } from "react";
import visibilityIcon from "../../../assets/icons/visibility.png";
import LocationContext from "../../../context/LocationContext";
const Visibility = () => {
  const { weather, isLoading } = useContext(LocationContext);
  console.log(weather);

  const visibility = weather?.current?.vis_km || 0;
  const getVisibilityStatus = (value) => {
    if (value < 5) return { status: "Low", value: 1 };
    if (value >= 5 && value <= 10) return { status: "Moderate", value: 0.5 };
    return { status: "High", value: 0 };
  };

  const { status, value } = getVisibilityStatus(visibility);

  return (
    <section style={{ background: "white", position: "relative" }}>
      <h3>Visibility</h3>
      {isLoading && (
        <div className="loader-wrapper">
          <span className="loader"></span>
        </div>
      )}
      <p style={{ filter: isLoading ? "blur(2px)" : "none" }}>
        <span className="visibility-value">{visibility}&nbsp;</span>
        <span className="visibility-unit">Km</span>
      </p>
      <p
        className="visibility-status"
        style={{ filter: isLoading ? "blur(2px)" : "none" }}
      >
        <span>{status}</span>
        <img
          src={visibilityIcon}
          alt={status}
          style={{ filter: `blur(${value}px)` }}
        />
      </p>
    </section>
  );
};
export default Visibility;
