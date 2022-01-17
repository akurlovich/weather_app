import React from 'react'
import classes from '../CardMedium.module.css';

export default function DayMedium(props) {
  // console.log(props.day);
  // console.log(props.day);
  const tempMin = props.temp.Minimum.Value;
  const tempMax = props.temp.Maximum.Value; 
  const temp = Math.ceil((tempMin + tempMax) / 2).toString();
  const windSpeed = props.day.Wind.Speed.Value;
  const windDirection = props.day.Wind.Direction.Localized;
  const rain = props.day.Rain.Value;
  const snow = props.day.Snow.Value;

  const icon = `/icons/${(+props.day.Icon > 9) ? props.day.Icon : '0'+props.day.Icon}-s.png`;
  
  return (
    <div className={classes.card__block_day}>    
      <div className={classes.card__image}>
        <img src={icon} alt="weather icon"/>
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
          <div>{windSpeed} km/h, {windDirection}</div>
        </div>
        <div className={classes.temp__value_small}>
          <img className={classes.temp__image} src='/icons/rain.png'></img>
          <div>{rain} mm</div>
        </div>
        <div className={classes.temp__value_small}>
          <img className={classes.temp__image} src='icons/snow.png'></img>
          <div>{Math.ceil(snow * 10)} mm</div>
        </div>
      </div>
    </div>
  )
}
