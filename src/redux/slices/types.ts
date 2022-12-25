export type Cartitem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  crust: number;
  size: number;
  count: number;
};

export type FetchPizzasParams = {
  sortType: string;
  categoryId: number;
  currentPage: number;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export type SearchPizzaParams = {
  sortType: string;
  categoryId: number;
  searchValue: string;
  currentPage: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: Cartitem[];
  totalItems: number;
}

export interface FilterSliceState {
  searchValue: string;
  currentPage: number;
  categoryId: number;
  sortType: string;
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

export enum Status {
  LOADING = 'pending',
  SUCCESS = 'fulfilled',
  ERROR = 'rejected',
}
