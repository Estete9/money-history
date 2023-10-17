import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './currencies/currenciesSlice';

const store = configureStore({
  reducer: {
    // HERE ADD YOUR SLICE (don't forget to export using default .reducer)
    currencies: currenciesReducer,
  },
});

export default store;
