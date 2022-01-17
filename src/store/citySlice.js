import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCityByIP, getCityUI, getWeather } from '../userAPI';

export const fetchIP = createAsyncThunk(
  'CITY/fetchIP',
  async function(_, {rejectWithValue}) {
    try {
      // const res = await axios.get('http://api.db-ip.com/v2/free/self');
      const res = await getCityByIP();
      // console.log('object', res)
      if (res.status !== 200) {
        throw new Error('City by IP not found!')
      } 
      return res.data;
      // return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }

  }
);

export const fetchCityUI = createAsyncThunk(
  'CITY/fetchCityUI',
  async function (cityKey, {rejectWithValue, getState}) {
    try {
      // const city = getState().cities;
      const resByIP = await getCityByIP();
      if (resByIP.status !== 200) {
        throw new Error('City by IP not found!')
      };
      // console.log(resByIP.data);
      const resCityUI = await getCityUI(resByIP.data.city);
      if (resCityUI.status !== 200) {
        throw new Error('City UI not found!')
      } 
      // console.log(resCityUI);
      let keyForCity = '28580';
      if (resCityUI.data[0]) {
        keyForCity = resCityUI.data[0].Key
      };
      // console.log('543', keyForCity);
      if (cityKey) {
        keyForCity = cityKey;
      };
      // console.log('544', keyForCity);
      const resCityWeather = await getWeather(keyForCity, 5);
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


const citySlice = createSlice({
  name: 'CITY',
  initialState: {
    cityShow: false,
    cityShow1Day: false,
    cityShow3Day: false,
    cityShow5Day: false,
    popUpShow: {
      value: false,
      city: '',
    },
    // popUpCity: '',
    cityByIP: {},
    cityArr: {},
    cityDay: {},
    cityNight: {},
    cityDate: {},
    cityTemp: {
      Minimum: {}, 
      Maximum: {},
    },
    cityDayWind: {
      Direction: {},
      Speed: {},
    },
    cityDayRain: {},
    cityDaySnow: {},
    cityNightWind: {
      Direction: {},
      Speed: {},
    },
    cityNightRain: {},
    cityNightSnow: {},
    weatherArr: [],
    threeDays: [],
    status: null,
    error: null,
  },
  reducers: {
    addCity(state, action) {
      state.cityArr.push({
        id: new Date().toISOString(),
        city: action.payload,
      })
    },
    addNewCity(state, action) {
      state.cityByIP = action.payload;
      state.cityShow = true;
      state.cityShow3Day = false;
      state.cityShow5Day = false;
    },
    addShow1Day(state, action) {
      state.cityShow1Day = true;
      state.cityShow3Day = false;
      state.cityShow5Day = false;
    },
    addShow3Day(state, action) {
      state.cityShow1Day = false;
      state.cityShow3Day = true;
      state.cityShow5Day = false;
    },
    addShow5Day(state, action) {
      state.cityShow1Day = false;
      state.cityShow3Day = false;
      state.cityShow5Day = true;
    },
    addPopUpShow(state, action) {
      state.popUpShow = action.payload;
    }
  },
  extraReducers: {
    [fetchIP.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchIP.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.cityByIP = action.payload;
      state.cityShow = true;
    },
    [fetchIP.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
      state.cityShow = false;
    },


    [fetchCityUI.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchCityUI.fulfilled]: (state, action) => {
      state.cityShow = true;
      state.cityShow1Day = true;
      state.status = 'resolved';
      state.cityArr = action.payload;
      state.cityTemp = action.payload.DailyForecasts[0].Temperature;
      state.cityDate = action.payload.DailyForecasts[0];
      state.cityDay = action.payload.DailyForecasts[0].Day;
      state.cityDayWind = action.payload.DailyForecasts[0].Day.Wind;
      state.cityDayRain = action.payload.DailyForecasts[0].Day.Rain; 
      state.cityDaySnow = action.payload.DailyForecasts[0].Day.Snow;
      state.cityNight = action.payload.DailyForecasts[0].Night;
      state.cityNightWind = action.payload.DailyForecasts[0].Night.Wind;
      state.cityNightRain = action.payload.DailyForecasts[0].Night.Rain; 
      state.cityNightSnow = action.payload.DailyForecasts[0].Night.Snow;
      state.weatherArr = action.payload.DailyForecasts;
      for (let i = 0; i <= 2; i++) {
        state.threeDays.push(action.payload.DailyForecasts[i])
        // state.warr.push(i)
      }
    },
    [fetchCityUI.rejected]: (state, action) => {
      state.status = 'rejected';
      state.cityShow = false;
      state.error = action.payload;
    }
  }
});

export const {
  addCity,
  addNewCity,
  addShow1Day,
  addShow3Day,
  addShow5Day,
  addPopUpShow,
} = citySlice.actions;

export default citySlice.reducer;