import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json
// https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json

const startUrl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@';
const apiVersion = '1';
const date = 'latest';
const baseUrl = `${startUrl}${apiVersion}/${date}`;
const topCurrencyArray = ['USD', 'GBP', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR'];

const initialState = {
  currenciesData: [],
  currencyHistory: [],
  isLoadingData: true,
  isLoadingHistory: true,
  error: null,
};

export const fetchSymbolsAPI = createAsyncThunk(
  'currencies/symbols',
  async (_, { rejectWithValue }) => {
    try {
      const currencySymbols = await axios.get(`${baseUrl}/currencies.json`);
      console.log('currencySymbols.data', currencySymbols.data);
      return currencySymbols.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

export const fetchCurrencyHistory = createAsyncThunk(
  'currencies/currency-history',
  // prettier-ignore
  async ({ symbol }, { rejectWithValue }) => {
    try {
      const currencyTimeline = await axios.get(`${baseUrl}/currencies/${symbol}.json`);
      console.log('currencyTimeline', currencyTimeline);
      return currencyTimeline;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    clearCurrencyHistory: (store) => {
      store.currencyHistory = [];
      store.isLoadingHistory = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSymbolsAPI.pending, (store) => {
        store.isLoadingData = true;
      })
      .addCase(fetchSymbolsAPI.fulfilled, (store, action) => {
        const currenciesArray = Object.keys(action.payload.symbols).map((key) => ({
          currencySymbol: key,
          currencyCountry: action.payload.symbols[key],
        }));
        // prettier-ignore
        const top8Currencies = currenciesArray.filter((currency) => (
          topCurrencyArray.includes(currency.currencySymbol)
        ));
        store.currenciesData = top8Currencies;
        store.isLoadingData = false;
      })
      .addCase(fetchSymbolsAPI.rejected, (store, action) => {
        store.error = action.error;
        store.isLoadingData = false;
      })
      .addCase(fetchCurrencyHistory.pending, (store) => {
        store.isLoadingHistory = true;
      })
      .addCase(fetchCurrencyHistory.fulfilled, (store, action) => {
        store.currencyHistory = action.payload;
        store.isLoadingHistory = false;
      })
      .addCase(fetchCurrencyHistory.rejected, (store, action) => {
        store.error = action.error;
        store.isLoadingHistory = false;
      });
  },
});

export const { clearCurrencyHistory } = currenciesSlice.actions;

export default currenciesSlice.reducer;
