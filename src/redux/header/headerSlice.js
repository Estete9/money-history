import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
  name: 'header',
  initialState: { isOpen: false },
  reducers: {
    openSearchBar: (store) => {
      store.isOpen = !store.isOpen;
    },
  },
});

export const { openSearchBar } = headerSlice.actions;
export default headerSlice.reducer;
