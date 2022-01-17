import React from 'react';
import { useSelector } from 'react-redux';
import classes from './DayBlock.module.css';

export default function DayBlock() {
  const {cityDay, cityTemp, cityDayWind, cityDayRain, cityDaySnow} = useSelector(state => state.cities);
  const tempMax = cityTemp.Maximum.Value;
  const tempMin = cityTemp.Minimum.Value;
  const temp = Math.ceil((tempMax + tempMin) / 2).toString();
  const icon = `/icons/${(+cityDay.Icon > 9) ? cityDay.Icon : '0'+cityDay.Icon}-s.png`;

  return (
    <div className={classes.card__block_day}> 
      <div className={classes.card__image}>
        <img src={icon} alt="weather icon"/>
        <div className={classes.temp__value_middle}>
        {/* {cityArr.DailyForecasts[0].Day.LongPhrase} */}
        {cityDay.LongPhrase}
        </div>
      </div>
      <div className={classes.card__info}>
        <div className={classes.card__temp}>
          <div className={classes.temp__value}>{temp}</div>
          <div className={classes.temp__icon}>°C</div>
        </div>
        <div className={classes.card__minmax}>
        <div className={classes.minmax__min}>
          <div className={classes.temp__value_small}>Min:</div>
            <div className={classes.card__temp}>
              <div className={classes.temp__value_small}>{tempMin}</div>
              <div className={classes.temp__icon_small}>°C</div>
            </div>
          </div>
        <div className={classes.minmax__max}>
          <div className={classes.minmax__min}>
            <div className={classes.temp__value_small}>Max:</div>
              <div className={classes.card__temp}>
                <div className={classes.temp__value_small}>{tempMax}</div>
                <div className={classes.temp__icon_small}>°C</div>
              </div>
          </div>
        </div>
        </div> 
      </div>
      <div className={classes.temp__options}>
        <div className={classes.temp__value_small}>
          <img className={classes.temp__image} src='/icons/Wind.png'>

          </img>
          <div>{cityDayWind.Speed.Value} km/h, {cityDayWind.Direction.Localized}</div>
        </div>
        <div className={classes.temp__value_small}>
          <img className={classes.temp__image} src='/icons/rain.png'></img>
          <div>{cityDayRain.Value} mm</div>
        </div>
        <div className={classes.temp__value_small}>
          <img className={classes.temp__image} src='icons/snow.png'></img>
          <div>{Math.ceil(cityDaySnow.Value * 10)} mm</div>
        </div>
      </div>
    </div>
  )
}
