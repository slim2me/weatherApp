import { useContext } from "react";
import sunrise from "../../../assets/icons/sunrise.png";
import sunset from "../../../assets/icons/sunset.png";
import LocationContext from "../../../context/LocationContext";
const SunStatus = () => {
  const { weather,isLoading} =
  useContext(LocationContext);
  
  return (
    <section style={{ background: "white" }} className="sun-status">
      <h3>Sunrise & Sunset</h3>
      <div className="sun-rise">
        <img src={sunrise} alt="sunrise"  width={32}/>
        <p>
          <span>{weather?.forecast?.forecastday[0].astro.sunrise || 'Unknown'}</span>
        </p>
      </div>
      <div className="sun-set">
        <img src={sunset} alt="sunset"  width={32}/>
        <p>
          <span>{weather?.forecast?.forecastday[0].astro.sunset || 'Unknown'}</span>
        </p>
      </div>
    </section>
  );
};
export default SunStatus;
