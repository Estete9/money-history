import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import CurrenciesList from '../components/CurrenciesList';

jest.mock('axios');
const mockStore = configureStore([]);

describe('Integration tests for CurrenciesList component', () => {
  test('Checks if CurrencyList renders correctly after async API consumption', async () => {
    const mockData = [
      {
        currencyCountry: 'Australian Dollar',
        currencySymbol: 'AUD',
      },
      {
        currencyCountry: 'Canadian Dollar',
        currencySymbol: 'CAD',
      },
    ];
    axios.get.mockResolvedValue({ data: mockData });
    const currenciesStore = mockStore({
      currencies: {
        currenciesData: mockData,
        isLoadingData: false,
      },
      header: {
        searchQuery: '',
        isSearchBarOpen: '',
      },
    });

    const component = renderer.create(
      <Provider store={currenciesStore}>
        <MemoryRouter>
          <CurrenciesList />
        </MemoryRouter>
      </Provider>,
    );
    const currenciesListTree = component.toJSON();

    expect(currenciesListTree).toMatchSnapshot();
  });
  test('Checks if loading screen in CurrencyList renders correctly', () => {
    const currenciesStore = mockStore({
      currencies: {
        currenciesData: [],
        isLoadingData: true,
      },
      header: {
        searchQuery: '',
        isSearchBarOpen: '',
      },
    });
    const component = renderer.create(
      <Provider store={currenciesStore}>
        <MemoryRouter>
          <CurrenciesList />
        </MemoryRouter>
      </Provider>,
    );
    const currenciesListTree = component.toJSON();

    expect(currenciesListTree).toMatchSnapshot();
  });
});
