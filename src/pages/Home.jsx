import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

import { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
  const sortType = useSelector((state) => state.filter.sortType);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://62a159bdcc8c0118ef49d6b2.mockapi.io/items?page=${currentPage}&limit=10&${
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
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
