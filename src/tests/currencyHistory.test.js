import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
// import axios from 'axios';
import { Provider } from 'react-redux';
import CurrencyHistory from '../components/CurrencyHistory';

jest.mock('axios');

describe('Integration tests for CurrenciesHistory component', () => {
  const mockConfigStore = configureStore([]);
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
