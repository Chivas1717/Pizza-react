import { getTotalItems } from './getTotalItems';
import { getTotalPrice } from './getTotalPrice';

export const getCartLocalStore = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = getTotalPrice(items);
  const totalItems = getTotalItems(items);

  return {
    items,
    totalPrice,
    totalItems,
  };
};
