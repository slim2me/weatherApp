import { useContext } from "react";
import OneDay from "./week/OneDay";
import "../../assets/style/week.css";
import LocationContext from "../../context/LocationContext";

const Week = () => {
  const { weather, isloading } = useContext(LocationContext);
  const days = weather?.forecast?.forecastday;

  return (
    <section className="week">

      {
        !days&&(
          Array.from({ length: 7}).map((_, index) => (
            <OneDay key={index} data={{index}}/>
          ))
        )
      }
      {days?.map((day, index) => (
        <OneDay data={{day,index}} key={index} />
      ))}
      {Array.from({ length: 7 - days?.length }).map((_, index) => (
        <OneDay key={index} data={{ index: index + days.length }} />
      ))}
    </section>
  );
};
export default Week;
