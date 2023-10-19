import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
  name: 'header',
  initialState: { isSearchBarOpen: false, searchQuery: null },
  reducers: {
    toggleSearchBar: (store) => {
      store.isSearchBarOpen = !store.isSearchBarOpen;
    },
    updateSearchQuery: (store, action) => {
      store.searchQuery = action.payload;
    },
  },
});

export const { toggleSearchBar, updateSearchQuery } = headerSlice.actions;
export default headerSlice.reducer;
