import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Cartitem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  crust: number;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: Cartitem[];
  totalItems: number;
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Cartitem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        // console.log(findItem);
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
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        state.totalItems--;
        state.totalPrice -= findItem.price;
        findItem.count--;
        if (findItem.count === 0) {
          if (window.confirm('Remove this item from cart?')) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
          } else {
            state.totalItems++;
            state.totalPrice += findItem.price;
            findItem.count++;
          }
        }
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        if (window.confirm('Remove this item from cart?')) {
          state.items = state.items.filter((obj) => obj.id !== action.payload);
          state.totalItems -= findItem.count;
          state.totalPrice -= findItem.count * findItem.price;
        }
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
