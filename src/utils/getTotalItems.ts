import { Cartitem } from '../redux/slices/types';

export const getTotalItems = (items: Cartitem[]) => {
  return items.reduce((sum, obj) => {
    return sum + obj.count;
  }, 0);
};
