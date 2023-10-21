import currenciesReducer, { fetchSymbolsAPI } from '../redux/currencies/currenciesSlice';

test('currenciesSlice is loading', () => {
  let store = null;
  store = currenciesReducer(undefined, fetchSymbolsAPI.pending());
  expect(store.isLoadingData).toBe(true);
});
