import axios from 'axios';

const API_KEY = 'COTk1PPFKxAfDAcm0YhYhDaTjhtn73GR';

// const citySearch = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=COTk1PPFKxAfDAcm0YhYhDaTjhtn73GR&q=minsk';
// const weatherSearch = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/28580?apikey=COTk1PPFKxAfDAcm0YhYhDaTjhtn73GR&details=true&metric=true";

export const getCityByIP = async () => {
  return await axios.get('http://api.db-ip.com/v2/free/self')
};

const cityUI = '28580';

export const getCityUI = async (city) => {
  return await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=COTk1PPFKxAfDAcm0YhYhDaTjhtn73GR&q=${city}`);  
};

export const getWeather = async (cityUI, dayCount) => {
  return await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/${dayCount}day/${cityUI}?apikey=${API_KEY}&details=true&metric=true`);
};
