import { compose, configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
console.log(filterReducer);
export const store = configureStore({
  reducer: { counter: filterReducer },
});
