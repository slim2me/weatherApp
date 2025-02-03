import { useContext } from "react";
import LocationContext from "../../context/LocationContext";

const Header = () => {
  const { degree, setDegree } = useContext(LocationContext);

  const toggleDegree = () => {
    setDegree(degree === "Celsius" ? "Fahrenheit" : "Celsius");
  };

  return (
    <section className="header">
      <h2>Week</h2>
      <p className="degree-scales">
        <span
          className={degree === "Celsius" ? "celsus active" : "celsus"}
          onClick={toggleDegree}
        >
          °C
        </span>
        <span
          className={degree === "Fahrenheit" ? "fahrenheit active" : "fahrenheit"}
          onClick={toggleDegree}
        >
          °F
        </span>
      </p>
    </section>
  );
};

export default Header;
