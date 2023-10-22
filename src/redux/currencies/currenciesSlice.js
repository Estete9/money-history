import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://data.fixer.io/api/';
const apiKey = '87ab7f42d6987a295d7b9f3fb18be28a';
const topCurrencyArray = ['USD', 'GBP', 'EUR', 'JPY', 'CHF', 'CAD', 'AUD', 'ZAR'];

const initialState = {
  currenciesData: [],
  currencyHistory: [],
  isLoadingData: true,
  isLoadingHistory: true,
  error: null,
};

const makeLast5Years = (year) => {
  let thisYear = year;
  const last5Years = [];
  for (let i = 0; i < 5; i += 1) {
    last5Years.push(thisYear);
    thisYear -= 1;
  }
  return last5Years;
};

export const fetchSymbolsAPI = createAsyncThunk(
  'currencies/symbols',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}symbols?access_key=${apiKey}`, {
        method: 'GET',
        mode: 'cors', // Set the CORS mode
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const currencySymbols = await response.json();
      console.log('currencySymbols', currencySymbols);
      return currencySymbols;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

export const fetchCurrencyHistory = createAsyncThunk(
  'currencies/currency-history',
  async ({ symbol, currentDate }, { rejectWithValue }) => {
    const thisYear = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1 and pad with '0' if necessary.
    const day = String(currentDate.getDate()).padStart(2, '0');
    const past5Years = makeLast5Years(thisYear);
    // prettier-ignore
    return Promise.all(
      past5Years.map(async (year) => {
        try {
          const currencyTimeline = await axios.get(
            `${baseUrl}${year}-${month}-${day}?access_key=${apiKey}&&symbols=${symbol}`,
          );
          return currencyTimeline.data;
        } catch (error) {
          return rejectWithValue(error.response);
        }
      }),
    );
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
