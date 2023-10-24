import React from 'react';
// import { render, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Header from '../components/Header';

const mockStore = configureStore([]);

describe('Integration tests for Header component', () => {
  test('it renders correctly in CurrencyConversion component', () => {
    const store = mockStore({
      header: {
        isSearchBarOpen: false,
      },
    });

    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/currency/AUD']}>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    const headerTree = component.toJSON();
    expect(headerTree).toMatchSnapshot();
  });

  test('it renders correctly in CurrenciesList component', () => {
    const store = mockStore({
      header: {
        isSearchBarOpen: false,
      },
    });

    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    const headerTree = component.toJSON();
    expect(headerTree).toMatchSnapshot();
  });
});
