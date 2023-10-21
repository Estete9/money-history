import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import CurrencyHistory from '../components/CurrencyHistory';

jest.mock('axios');
const mockConfigStore = configureStore([]);

describe('Integration tests for CurrenciesHistory component', () => {
  test('Checks if CurrencyList renders correctly after async API consumption', async () => {
    const mockCurrenciesData = [
      {
        currencySymbol: 'AUD',
        currencyCountry: 'Australian Dollar',
      },
      {
        currencySymbol: 'CAD',
        currencyCountry: 'Canadian Dollar',
      },
      {
        currencySymbol: 'CHF',
        currencyCountry: 'Swiss Franc',
      },
      {
        currencySymbol: 'EUR',
        currencyCountry: 'Euro',
      },
      {
        currencySymbol: 'GBP',
        currencyCountry: 'British Pound Sterling',
      },
      {
        currencySymbol: 'JPY',
        currencyCountry: 'Japanese Yen',
      },
      {
        currencySymbol: 'USD',
        currencyCountry: 'United States Dollar',
      },
      {
        currencySymbol: 'ZAR',
        currencyCountry: 'South African Rand',
      },
    ];
    const mockHistoryData = [
      {
        success: true,
        timestamp: 1697910064,
        historical: true,
        base: 'EUR',
        date: '2023-10-21',
        rates: {
          AUD: 1.679069,
        },
      },
      {
        success: true,
        timestamp: 1697910064,
        historical: true,
        base: 'EUR',
        date: '2020-10-21',
        rates: {
          AUD: 1.679069,
        },
      },
    ];

    axios.get.mockResolvedValue({ data: mockHistoryData });

    const initialState = {
      currencies: {
        currencyHistory: mockHistoryData,
        currenciesData: mockCurrenciesData,
        isLoadingHistory: false,
      },
    };

    const historyStore = mockConfigStore(initialState);

    let component;
    await renderer.act(async () => {
      component = renderer.create(
        <Provider store={historyStore}>
          <MemoryRouter initialEntries={['/currency/AUD']}>
            <Routes>
              <Route path="/currency/:symbol" element={<CurrencyHistory />} />
            </Routes>
          </MemoryRouter>
        </Provider>,
      );
    });
    const currencyHistoryTree = component.toJSON();
    await waitFor(() => expect(currencyHistoryTree).toMatchSnapshot());
  });

  test('Checks if loading screen in CurrencyHistory renders correctly', () => {
    const historyStore = mockConfigStore({
      currencies: {
        currencyHistory: [],
        isLoadingHistory: true,
      },
    });
    const component = renderer.create(
      <Provider store={historyStore}>
        <CurrencyHistory />
      </Provider>,
    );
    const currencyHistoryTree = component.toJSON();

    expect(currencyHistoryTree).toMatchSnapshot();
  });
});
