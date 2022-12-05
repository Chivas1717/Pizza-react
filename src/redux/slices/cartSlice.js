import { createSlice } from '@reduxjs/toolkit';
import { find } from 'lodash';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalPrice: 0,
    items: [],
    totalItems: 0,
  },
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        console.log(findItem);
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalItems = state.items.reduce((sum, obj) => {
        return sum + obj.count;
      }, 0);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      state.totalItems--;
      state.totalPrice -= findItem.price;
      findItem.count--;
      if (findItem.count === 0) {
        if (window.confirm('Remove this item from cart?')) {
          state.items = state.items.filter((obj) => obj.id !== action.payload.id);
        }
      }
    },
    removeItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (window.confirm('Remove this item from cart?')) {
        state.items = state.items.filter((obj) => obj.id !== action.payload.id);
        state.totalItems -= findItem.count;
        state.totalPrice -= findItem.count * findItem.price;
      }
    },
    clearItems(state, action) {
      state.items = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
