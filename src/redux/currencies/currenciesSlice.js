import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://data.fixer.io/api/';
const apiKey = '87ab7f42d6987a295d7b9f3fb18be28a';

const initialState = {
  currenciesData: [],
  isLoading: true,
  error: null,
};

export const fetchSymbolsAPI = createAsyncThunk('currencies/symbols', async (_, { rejectWithValue }) => {
  try {
    const currencySymbols = await axios.get(`${baseUrl}symbols?access_key=${apiKey}`);
    console.log('currencySymbols.data', currencySymbols.data);
    return currencySymbols.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSymbolsAPI.pending, (store) => {
        store.isLoading = true;
      })
      .addCase(fetchSymbolsAPI.fulfilled, (store, action) => {
        console.log('currenciesData', action.payload);
        store.currenciesData = action.payload;
        store.isLoading = false;
      })
      .addCase(fetchSymbolsAPI.pending, (store, action) => {
        console.log('error=action.payload', action.payload);
        store.error = action.payload;
      });
  },
});

export default currenciesSlice.reducer;
