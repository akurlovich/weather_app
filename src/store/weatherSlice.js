import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCityByIP, getCityUI, getWeather } from '../userAPI';

export const fiveDay = createAsyncThunk(
  'CITY/fiveDay',
  async function (_, {rejectWithValue, getState}) {
    try {
      // const city = getState().cities;
      const resByIP = await getCityByIP();
      if (resByIP.status !== 200) {
        throw new Error('City by IP not found!')
      };
      // console.log(res.data);
      const resCityUI = await getCityUI(resByIP.data.city);
      if (resCityUI.status !== 200) {
        throw new Error('City UI not found!')
      } 
      // console.log(res2.data[0].Key);
      const resCityWeather = await getWeather(resCityUI.data[0].Key, 5);
      if (resCityWeather.status !== 200) {
        throw new Error('Weather not found!')
      } 
      // console.log(resCityWeather.data);
      // return resCityWeather.data;
      return resCityWeather.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: 'WEATHER',
  initialState: {
    weatherArr: [],
    threeDays: [],
    status: null,
    error: null,
  },
  reducers: {
    // addCity(state, action) {
    //   state.cityArr.push({
    //     id: new Date().toISOString(),
    //     city: action.payload,
    //   })
    // },
    // addTemperature(state, action) {
    //   state.temperature = action.payload;
    // },
  },
  extraReducers: {
    [fiveDay.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fiveDay.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.weatherArr = action.payload.DailyForecasts;
      for (let i = 0; i <= 2; i++) {
        state.threeDays.push(action.payload.DailyForecasts[i])
        // state.warr.push(i)
      }
    },
    [fiveDay.rejected]: (state, action) => {
      state.status = 'rejected';
    }
  }
});

// export const {addCity, addTemperature} = citySlice.actions;

export default weatherSlice.reducer;