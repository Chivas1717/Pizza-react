import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { sortType, categoryId, currentPage } = params;
  const { data } = await axios.get(
    `https://62a159bdcc8c0118ef49d6b2.mockapi.io/items?page=${currentPage}&limit=10&${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${sortType}`,
  );
  return data;
});

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: [],
    status: 'pending',
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'fulfilled';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'rejected';
      state.items = [];
    },
    [fetchPizzas.pending]: (state, action) => {
      state.status = 'pending';
      state.items = [];
    },
  },
});

export const selectPizza = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
