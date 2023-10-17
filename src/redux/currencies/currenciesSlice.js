import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currenciesData: [],
  isLoading: true,
  error: null,
};

const currenciesReducer = createSlice({
  name: 'currencies',
  initialState,
  reducers: {},
});

export default currenciesReducer.reducer;
