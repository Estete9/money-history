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
        const currenciesArray = Object.keys(action.payload.symbols).map((key) => ({
          currencySymbol: key,
          currencyCountry: action.payload.symbols[key],
        }));
        store.currenciesData = currenciesArray;
        store.isLoading = false;
      })
      .addCase(fetchSymbolsAPI.rejected, (store, action) => {
        store.error = action.payload;
      });
  },
});

export default currenciesSlice.reducer;
