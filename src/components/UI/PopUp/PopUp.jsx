import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPopUpShow } from '../../../store/citySlice';
import './popUp.css';

export default function PopUp() {
  const dispatch = useDispatch();

  const {popUpShow} = useSelector(state => state.cities);

  const closePopUp = () => {
    dispatch(addPopUpShow({
      value: false,
      city: '',
    }))
  }

  return (
    <div className='popup__wrapper'>
      <div className="popup__container">
        <div className="popup__title">
          Weather for city "{popUpShow.city}" not found!
        </div>
        <button
          className="popup__button"
          onClick={closePopUp}
          >
          Close
        </button>
      </div>
    </div>
  )
}
