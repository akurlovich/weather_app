import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addTemperature, fetchCityUI, fetchIP} from '../../store/citySlice';
import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import axios from 'axios';
import classes from './Weather.module.css';
import Loader from '../UI/Loader/Loader.jsx';
import { fiveDay } from '../../store/weatherSlice';
import PopUp from '../UI/PopUp/PopUp';

function Weather() {
  
  const cityUI = '28580';

  const API_KEY = 'COTk1PPFKxAfDAcm0YhYhDaTjhtn73GR';

  const {cityArr: citys, temperature: temper, error: showError, status, cityByIP, cityDay, cityTemp, cityDate, cityShow, weatherArr, threeDays, popUpShow} = useSelector(state => state.cities);

  // const {weatherArr, threeDays} = useSelector(state => state.weather);
  // const temper = useSelector(state => state.cities.temperature);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    // dispatch(fetchIP());
    // dispatch(fetchCityUI());
    // dispatch(fiveDay());
  }, []);

  const getWeather = async () => {
    const res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityUI}?apikey=${API_KEY}&details=true&metric=true`);
    console.log(res.data);    
  };

  const showWeather = async () => {
    await getWeather();
  };

  const showIP = async () => {
    const res = await axios.get('http://api.db-ip.com/v2/free/self');
    console.log(res.data);
  };

  const showCity = () => {
    console.log(citys);
    // console.log(citys.DailyForecasts[0].Day);
    // console.log(temper);
    // dispatch(addTemperature('10000'));
  };
   const showName = async () => {
    try{
      const continents = await axios.get('http://dataservice.accuweather.com/locations/v1/regions?apikey=COTk1PPFKxAfDAcm0YhYhDaTjhtn73GR');
      console.log(continents.data);
      const countries = await axios.get('http://dataservice.accuweather.com/locations/v1/countries/eur?apikey=COTk1PPFKxAfDAcm0YhYhDaTjhtn73GR');
      //http://dataservice.accuweather.com/locations/v1/cities/by/search?apikey=COTk1PPFKxAfDAcm0YhYhDaTjhtn73GR&q=minsk 
      console.log(countries.data);
      const ser = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=COTk1PPFKxAfDAcm0YhYhDaTjhtn73GR&q=min');
      console.log(ser.data);
    }catch(err){
      console.error(err);
    }
   }


  return (
    <div className={classes.weather}>
      {popUpShow.value && <PopUp/>}
      {status === 'loading' ? <Loader/> : null}
      {/* {showError && <div>{showError}</div>} */}
      {/* <div className={classes.weather__location}>
        <div className={classes.location__item}>Minsk</div>
        <div className={classes.location__item}>Belarus</div>
      </div> */}
      {/* <button 
        className="show-weather"
        onClick={showWeather}
      >
        Click
      </button>
      <button 
        className="show-weather"
        onClick={showName}
      >
        name
      </button>
      <button 
        className="show-weather"
        onClick={showCity}
      >
        test
      </button> */}
      {/* {citys.length ? 
        citys.map((item) => 
          <div key={item.id}>{item.city}</div>
        )
        : null
      } */}
      {/* <Loader/> */}
      {/* {status === 'loading' && <WeatherCard/>} */}
      {cityShow && <WeatherCard/>}
    </div>
  )
};

export default Weather;
