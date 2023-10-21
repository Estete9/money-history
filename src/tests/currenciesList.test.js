import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import CurrenciesList from '../components/CurrenciesList';

const mockStore = configureStore([]);

describe('Integration tests for CurrenciesList component', () => {
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
        <CurrenciesList />
      </Provider>,
    );
    const currenciesListTree = component.toJSON();

    expect(currenciesListTree).toMatchSnapshot();
  });
});
