import React from 'react'
import classes from '../CardMedium.module.css';

export default function NightMedium(props) {
  // const temp = Math.ceil((tempMax + tempMin) / 2).toString();
  const tempMin = props.temp.Minimum.Value;
  const tempMax = props.temp.Maximum.Value; 
  const temp = Math.ceil((tempMin)).toString();
  const windSpeed = props.night.Wind.Speed.Value;
  const windDirection = props.night.Wind.Direction.Localized;
  const rain = props.night.Rain.Value;
  const snow = props.night.Snow.Value;

  const icon = `/icons/${(+props.night.Icon > 9) ? props.night.Icon : '0'+props.night.Icon}-s.png`;

  return (
    <div className={classes.card__block_night}>    
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
