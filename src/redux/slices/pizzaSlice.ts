import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

type FetchPizzasParams = {
  sortType: string;
  categoryId: number;
  currentPage: number;
};

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

interface PizzaSliceState {
  items: Pizza[];
  status: 'fulfilled' | 'rejected' | 'pending';
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'pending',
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortType, categoryId, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://62a159bdcc8c0118ef49d6b2.mockapi.io/items?page=${currentPage}&limit=10&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType}`,
    );
    return data;
  },
);

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'fulfilled';
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.status = 'rejected';
    });

    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = [];
      state.status = 'pending';
    });
  },

  // extraReducers: {
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'fulfilled';
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = 'rejected';
  //     state.items = [];
  //   },
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'pending';
  //     state.items = [];
  //   },
  // },
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
