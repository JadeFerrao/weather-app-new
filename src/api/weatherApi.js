import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY

const fetchWeatherData = async (city) => {
  try {
     // console.log(city);
     // console.log(process.env.REACT_APP_API_KEY);
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    return response.data 
    // console.log(response.data );
  } catch (error) {
    // console.error("Error: ", error);
    throw error; 
  }
};

export default fetchWeatherData;