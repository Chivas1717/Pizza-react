import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';

import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState('rating');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://62a159bdcc8c0118ef49d6b2.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setTimeout(() => {
          setItems(json);
          setIsLoading(false);
        }, 500);
      });
    window.scrollTo(0, 0);
  }, [sortType, categoryId, currentPage]);

  const pizzas = items
    .filter((obj) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} onClickSortType={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
