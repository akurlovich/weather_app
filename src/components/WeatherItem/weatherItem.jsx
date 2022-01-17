import React from 'react';
import classes from './WeatherItem.module.css';

function WeatherItem() {
  const a = '01'
  const img1 = `/icons/${a}-s.png`
  return (
    <div className={classes.weather__item}>
      <h2 className={classes.item__title}>Minsk, Belarus</h2>
      <div className={classes.item__block}>
        <img src={img1} className={classes.item__image}/>
        <div className={classes.item__info}>
          <div className={classes.item__info__temp}>
            <div>10</div>
            <div>&#8451;</div>
          </div>
          <div>Intermittent Clouds</div>
          <div className={classes.item__info__minmax}>
            <div>Min: 4 &#8451;</div>
            <div>Max: 15 &#8451;</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default WeatherItem;
