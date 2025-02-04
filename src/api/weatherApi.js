import axios from "axios";

export const fetchWeather= async (props) => {
    
  const url = 'https://api.weatherapi.com/v1/forecast.json';
  const apiKey = '6b3e9f00a344407ba07122530252101';
  const location = props;
  const days = 7;
  const aqi = 'yes';
  const alerts = 'no';

  try {
    const response = await axios.get(url, {
      params: {
        key: apiKey,
        q: location,
        days,
        aqi,
        alerts,
      },
    });

    // Log the weather data
    return response.data
  } catch (error) {
    // Handle and log errors
    if (error.response) {
      console.error('Error Response:', error.response.data);
    } else if (error.request) {
      console.error('Error Request:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
  }
};

