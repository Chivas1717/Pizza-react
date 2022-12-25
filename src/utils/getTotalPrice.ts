import { Cartitem } from '../redux/slices/types';

export const getTotalPrice = (items: Cartitem[]) => {
  return items.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);
};
