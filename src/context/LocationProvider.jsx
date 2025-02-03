import React, { useEffect, useState, useRef } from "react";
import LocationContext from "./LocationContext.jsx";
import { fetchWeather } from "../api/weatherApi.js";
import axios from "axios";

export default function LocationProvider({ children }) {
  const [weather, setWeather] = useState(null);
  const [flag, setFlag] = useState(null);
  const searchInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [degree,setDegree]=useState('Celsius')

  useEffect(() => {
    // Load weather and flag data from localStorage when the component mounts
    const storedWeather = localStorage.getItem("weather");
    const storedFlag = localStorage.getItem("flag");

    if (storedWeather && storedFlag) {
      setWeather(JSON.parse(storedWeather));
      setFlag(storedFlag);
    }
  }, []);

  const selectCity = () => {
    const city = searchInput.current.value;
    if (city) {
      setIsLoading(true); // Start loading
      fetchWeather(city)
        .then((data) => {
          setWeather(data);
          setError("");
          const countryName = data.location.country;
          axios
            .get(`https://restcountries.com/v3.1/name/${countryName}`)
            .then((response) => {
              const flag = response.data[0]?.flags?.png; // Get the flag URL
              setFlag(flag); // Assuming you have a state for storing the flag

              // Store the weather and flag in localStorage
              localStorage.setItem("weather", JSON.stringify(data));
              localStorage.setItem("flag", flag);
            })
            .catch((err) => {
              console.error("Error fetching country flag:", err);
            })
            .finally(() => {
              setIsLoading(false); // End loading after axios is resolved
              searchInput.current.value = "";
            });
        })
        .catch((err) => {
          setError("City not found. Please try again.");
          setIsLoading(false); // End loading on weather fetch error
          searchInput.current.value = "";
        });
    }
  };

  return (
    <LocationContext.Provider
      value={{ weather, searchInput, selectCity, flag, isLoading, error ,degree,setDegree }}
    >
      {children}
    </LocationContext.Provider>
  );
}
