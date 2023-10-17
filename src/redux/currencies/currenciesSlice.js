import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://data.fixer.io/api/';
const apiKey = '87ab7f42d6987a295d7b9f3fb18be28a';

const initialState = {
  currenciesData: [],
  currencyHistory: [],
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

export const fetchCurrencyHistory = createAsyncThunk(
  'currencies/currency-history',
  async ({ symbol, currentDate, year }, { rejectWithValue }) => {
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1 and pad with '0' if necessary.
    const day = String(currentDate.getDate()).padStart(2, '0');
    try {
      const currencyTimeline = await axios.get(
        `${baseUrl}${year}-${month}-${day}?access_key=${apiKey}&symbols=${symbol}`,
      );
      console.log('currencyTimeline.data', currencyTimeline.data);
      return currencyTimeline.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

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
        store.error = action.error;
      })
      .addCase(fetchCurrencyHistory.pending, (store) => {
        store.isLoading = true;
      })
      .addCase(fetchCurrencyHistory.fulfilled, (store, action) => {
        store.currencyHistory = action.payload;
        store.isLoading = false;
      })
      .addCase(fetchCurrencyHistory.rejected, (store, action) => {
        store.error = action.error;
        store.isLoading = false;
      });
  },
});

export default currenciesSlice.reducer;
