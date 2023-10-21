import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import SearchBar from '../components/SearchBar';

describe('Integration test for searchBar component', () => {
  test('SearchBar is displayed correctly', () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      header: {
        isSearchBarOpen: true,
        searchQuery: '',
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <SearchBar />
      </Provider>,
    );
    const searchBarTree = component.toJSON();
    expect(searchBarTree).toMatchSnapshot();
  });
});
