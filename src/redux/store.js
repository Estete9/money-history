import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from './currencies/currenciesSlice';
import headerReducer from './header/headerSlice';

const store = configureStore({
  reducer: {
    // HERE ADD YOUR SLICE (don't forget to export using default .reducer)
    currencies: currenciesReducer,
    header: headerReducer,
  },
});

export default store;
