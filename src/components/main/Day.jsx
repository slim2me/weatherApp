import AirQuality from "./Day/AirQuality";
import Humidity from "./Day/Humidity";
import SunStatus from "./Day/SunStatus";
import UvIndex from "./Day/UvIndex";
import Visibility from "./Day/Visibility";
import WindStatus from "./Day/WindStatus";
import '../../assets/style/day.css'

const Day = () => {
  return (
    <section className="day-container">
      <h2>Today's Highlights</h2>
      <div className="day">
        <UvIndex />
        <WindStatus />
        <SunStatus />
        <Humidity />
        <Visibility />
        <AirQuality />
      </div>
    </section>
  );
};
export default Day;
