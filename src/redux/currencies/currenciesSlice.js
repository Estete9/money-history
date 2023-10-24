import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json
// https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json

const startUrl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@';
const apiVersion = '1';
const date = 'latest';
const baseUrl = `${startUrl}${apiVersion}/${date}`;
const topCurrencyArray = ['usd', 'gbp', 'eur', 'jpy', 'chf', 'cad', 'aud', 'zar'];

const initialState = {
  currenciesData: [],
  currencyConversion: [],
  isLoadingData: true,
  isLoadingConversion: true,
  error: null,
};

export const fetchSymbolsAPI = createAsyncThunk(
  'currencies/symbols',
  async (_, { rejectWithValue }) => {
    try {
      const currencySymbols = await axios.get(`${baseUrl}/currencies.json`);
      return currencySymbols.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

export const fetchCurrencyConversion = createAsyncThunk(
  'currencies/currency-conversion',
  // prettier-ignore
  async ({ symbol }, { rejectWithValue }) => {
    try {
      const currencyConversion = await axios.get(`${baseUrl}/currencies/${symbol}.json`);
      return currencyConversion.data[symbol];
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    clearCurrencyConversion: (store) => {
      store.currencyConversion = [];
      store.isLoadingConversion = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSymbolsAPI.pending, (store) => {
        store.isLoadingData = true;
      })
      .addCase(fetchSymbolsAPI.fulfilled, (store, action) => {
        const currenciesArray = Object.keys(action.payload).map((key) => ({
          currencySymbol: key,
          currencyCountry: action.payload[key],
        }));
        // prettier-ignore
        const top8Currencies = currenciesArray.filter((currency) => topCurrencyArray
          .includes(currency.currencySymbol));
        store.currenciesData = top8Currencies;
        store.isLoadingData = false;
      })
      .addCase(fetchSymbolsAPI.rejected, (store, action) => {
        store.error = action.error;
        store.isLoadingData = false;
      })
      .addCase(fetchCurrencyConversion.pending, (store) => {
        store.isLoadingConversion = true;
      })
      .addCase(fetchCurrencyConversion.fulfilled, (store, action) => {
        const currenciesArray = Object.keys(action.payload).map((key) => ({
          currencySymbol: key,
          currencyConversionValue: action.payload[key],
        }));
        store.currencyConversion = currenciesArray;
        store.isLoadingConversion = false;
      })
      .addCase(fetchCurrencyConversion.rejected, (store, action) => {
        store.error = action.error;
        store.isLoadingConversion = false;
      });
  },
});

export const { clearCurrencyConversion } = currenciesSlice.actions;

export default currenciesSlice.reducer;
