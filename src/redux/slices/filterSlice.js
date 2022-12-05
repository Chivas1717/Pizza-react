import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    searchValue: '',
    currentPage: 1,
    categoryId: 0,
    sortType: 'rating',
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = action.payload.sortType;
    },
    clearFilters: (state, action) => {
      state.currentPage = 1;
      state.categoryId = 0;
      state.sortType = 'rating';
    },
  },
});

export const selectFilter = (state) => state.filter;
export const selectFilterSortType = (state) => state.filter.sortType;

export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  clearFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
