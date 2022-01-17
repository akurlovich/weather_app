import {configureStore} from '@reduxjs/toolkit';
import cityReducer from './citySlice';
import weatherReducer from './weatherSlice';

export default configureStore({
  reducer: {
    cities: cityReducer,
    weather: weatherReducer,
  }
})