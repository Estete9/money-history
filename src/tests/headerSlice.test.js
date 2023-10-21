import headerReducer, { toggleSearchBar, updateSearchQuery } from '../redux/header/headerSlice';

describe('Header Tests:', () => {
  test('open search bar', () => {
    let store = { isSearchBarOpen: false, searchQuery: null };
    store = headerReducer(undefined, toggleSearchBar());
    expect(store.isSearchBarOpen).toBe(true);
  });

  test('search query updates', () => {
    let store = { isSearchBarOpen: false, searchQuery: null };
    store = headerReducer(undefined, updateSearchQuery('this is a test'));
    expect(store.searchQuery).toBe('this is a test');
  });
});
