import unknown from "../../../assets/icons/unknown-64.png";
import LocationContext from "../../../context/LocationContext";
import { useContext } from "react";

const OneDay = ({ data }) => {
  const { index } = data;
  const { isLoading, degree } = useContext(LocationContext); // Destructure degree from context

  const date = new Date(Date.now());

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
  const day = dayNames[(date.getDay() + index) % 7]?.slice(0, 3);

  // Get the temperature in the selected degree (Celsius or Fahrenheit)
  const maxTemp =
    degree === "Celsius"
      ? data?.day?.day?.maxtemp_c | 0
      : data?.day?.day?.maxtemp_f | 0;
  const minTemp =
    degree === "Celsius"
      ? data?.day?.day?.mintemp_c | 0
      : data?.day?.day?.mintemp_f | 0;

  return (
    <article style={{ position: "relative" }}>
      {isLoading && (
        <div className="loader-wrapper">
          <span className="loader"></span>
        </div>
      )}
      <div className="oneDay" style={{ filter: isLoading ? "blur(2px)" : "none" }}>
        <span>{day}</span>
        <img
          src={data?.day?.day?.condition?.icon || unknown}
          alt="cloud"
          width={64}
        />
        <p>
          {data?.day && (
            <span>{maxTemp || 0}° </span>
          )}
          <span className="negative">
            {data?.day ? (minTemp || 0) + "°" : "Unknown"}
          </span>
        </p>
      </div>
    </article>
  );
};

export default OneDay;
