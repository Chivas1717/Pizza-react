import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { FilterSliceState } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  currentPage: 1,
  categoryId: 0,
  sortType: 'rating',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = action.payload.sortType;
    },
    clearFilters: (state) => {
      state.currentPage = 1;
      state.categoryId = 0;
      state.sortType = 'rating';
      state.searchValue = '';
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterSortType = (state: RootState) => state.filter.sortType;

export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  clearFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
