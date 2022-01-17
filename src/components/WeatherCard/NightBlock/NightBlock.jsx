import React from 'react';
import { useSelector } from 'react-redux';
import classes from '../DayBlock/DayBlock.module.css';

export default function NightBlock() {
  const {cityNight, cityTemp, cityNightWind, cityNightRain, cityNightSnow} = useSelector(state => state.cities);
  const tempMax = cityTemp.Maximum.Value;
  const tempMin = cityTemp.Minimum.Value;
  const temp = Math.ceil(tempMin).toString();
  let icon = `/icons/${(+cityNight.Icon > 9) ? cityNight.Icon : '0'+cityNight.Icon}-s.png`;

  return (
    <div className={classes.card__block_night}>    
      <div className={classes.card__image}>
        <img src={icon}  alt="weather icon"/>
        <div className={classes.temp__value_middle}>
          {cityNight.LongPhrase}
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
          <div>{cityNightWind.Speed.Value} km/h, {cityNightWind.Direction.Localized}</div>
        </div>
        <div className={classes.temp__value_small}>
          <img className={classes.temp__image} src='/icons/rain.png'></img>
          <div>{cityNightRain.Value} mm</div>
        </div>
        <div className={classes.temp__value_small}>
          <img className={classes.temp__image} src='icons/snow.png'></img>
          <div>{Math.ceil(cityNightSnow.Value * 10)} мм</div>
        </div>
      </div>
    </div>
  )
}
