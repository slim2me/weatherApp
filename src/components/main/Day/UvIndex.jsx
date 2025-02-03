import { useEffect, useState,useContext } from "react";
import { Gauge } from "./Gauge";
import LocationContext from "../../../context/LocationContext";
const UvIndex = () => {
  const { weather,isLoading} =
  useContext(LocationContext);
  
  const [state, setState] = useState({
    series: [weather?.current?.uv],
    options: {
      chart: {
        type: "radialBar",
        offsetY: -20,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#F3F3F4",
            strokeWidth: "60%",
            margin: 5, // margin is in pixels
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
              offsetY: -2,
              fontSize: "22px",
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      fill: {
        colors: ["#FFBF5E"],
      },
      labels: ["Average Results"],
      tooltip: {
        enabled: false, // Disable tooltips
      },
      states: {
        hover: {
          filter: {
            type: "none", // Disable hover effects
          },
        },
      },
    },
  });

  const [number, setNumber] = useState(0);

  useEffect(() => {
    // Calculate the number and update the state
    const calculatedNumber = (weather?.current?.uv) ;    
   
      const interval = setInterval(() => {
        setNumber((prev) => {
          if (prev < calculatedNumber) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev; // Ensure a return value
          }
        });
      }, 50);

      return () => {
        clearInterval(interval);
      };
 
  }, [weather,state]);

  return (
    <section style={{ background: "white" ,position:'relative'}} className="uv-container">
       {isLoading && (
        <div className="loader-wrapper">
          <span className="loader"></span>
        </div>
      )}
      <h3>UV Index</h3>
      <div style={{ position: "relative" ,filter: isLoading ? "blur(2px)" : "none" }}>
        <Gauge number={number} />
      </div>
    </section>
  );
};
export default UvIndex;
