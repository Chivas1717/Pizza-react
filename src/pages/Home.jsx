import React from 'react';
import qs from 'qs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

import { useState, useEffect, useContext, useRef } from 'react';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

const Home = () => {
  const { sortType, categoryId, currentPage } = useSelector((state) => state.filter);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearchParam = useRef(false);
  const isMounted = useRef(false);
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(1);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    axios
      .get(
        `https://62a159bdcc8c0118ef49d6b2.mockapi.io/items?page=${currentPage}&limit=10&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType}`,
      )
      .then((res) => {
        // setTimeout(() => {
        setItems(res.data);
        setIsLoading(false);
        // }, 0);
      });

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(
        setFilters({
          ...params,
        }),
      );
      isSearchParam.current = true;
    }
  }, []);

  useEffect(() => {
    window.scroll(0, 0);

    if (!isSearchParam.current || counter === 2) {
      fetchPizzas();
    } else setCounter(counter + 1);

    isSearchParam.current = false;
  }, [sortType, categoryId, currentPage, counter]);

  useEffect(() => {
    // for bare main page on 1 render
    if (isMounted.current) {
      const queryStr = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryStr}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

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
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
