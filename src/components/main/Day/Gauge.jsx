import "../../../assets/style/gauge.css";

export  const Gauge = ({number}) => {
  

  return (
    <div className="sc-gauge">
      <div className="sc-background">
        <div
          className="sc-percentage"
          style={{ transform: `rotate(${(number / 15) * 180}deg)` }}
        ></div>
        <div className="sc-mask"></div>
        <span className="sc-value">{number}</span>
      </div>
      <span className="sc-min">0</span>
      <span className="sc-max">15</span>
    </div>
  );
};