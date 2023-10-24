import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import CurrencyConversion from '../components/CurrencyConversion';

jest.mock('axios');
const mockConfigStore = configureStore([]);

describe('Integration tests for CurrencyConversion component', () => {
  test('Checks if CurrencyList renders correctly after async API consumption', async () => {
    const mockCurrenciesData = [
      {
        currencySymbol: 'aud',
        currencyCountry: 'Australian Dollar',
      },
      {
        currencySymbol: 'cad',
        currencyCountry: 'Canadian Dollar',
      },
      {
        currencySymbol: 'chf',
        currencyCountry: 'Swiss Franc',
      },
      {
        currencySymbol: 'eur',
        currencyCountry: 'Euro',
      },
      {
        currencySymbol: 'gbp',
        currencyCountry: 'British Pound Sterling',
      },
      {
        currencySymbol: 'jpy',
        currencyCountry: 'Japanese Yen',
      },
      {
        currencySymbol: 'usd',
        currencyCountry: 'United States Dollar',
      },
      {
        currencySymbol: 'zar',
        currencyCountry: 'South African Rand',
      },
    ];
    const mockConversionData = [
      {
        currencySymbol: 'eur',
        currencyConversionValue: 0.59655744,
      },
      {
        currencySymbol: 'usd',
        currencyConversionValue: 0.63112036,
      },
    ];

    axios.get.mockResolvedValue({ data: mockConversionData });

    const initialState = {
      currencies: {
        currencyConversion: mockConversionData,
        currenciesData: mockCurrenciesData,
        isLoadingConversion: false,
      },
    };

    const conversionStore = mockConfigStore(initialState);

    let component;
    await renderer.act(async () => {
      component = renderer.create(
        <Provider store={conversionStore}>
          <MemoryRouter initialEntries={['/currency/aud']}>
            <Routes>
              <Route path="/currency/:symbol" element={<CurrencyConversion />} />
            </Routes>
          </MemoryRouter>
        </Provider>,
      );
    });
    const currencyConversionTree = component.toJSON();
    await waitFor(() => expect(currencyConversionTree).toMatchSnapshot());
  });

  test('Checks if loading screen in CurrencyConversion renders correctly', () => {
    const conversionStore = mockConfigStore({
      currencies: {
        currenciesData: [],
        currencyConversion: [],
        isLoadingConversion: true,
      },
    });
    const component = renderer.create(
      <Provider store={conversionStore}>
        <CurrencyConversion />
      </Provider>,
    );
    const currencyConversionTree = component.toJSON();

    expect(currencyConversionTree).toMatchSnapshot();
  });
});
