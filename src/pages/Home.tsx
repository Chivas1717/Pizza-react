import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

import { useState, useEffect, useRef } from 'react';
import {
  selectFilter, 
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizza } from '../redux/slices/pizzaSlice';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearchParam = useRef(false);
  const isMounted = useRef(false);
  const { items, status } = useSelector(selectPizza);
  const { sortType, categoryId, currentPage, searchValue } = useSelector(selectFilter);
  const [counter, setCounter] = useState(1);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    // axios
    //   .get(
    //     `https://62a159bdcc8c0118ef49d6b2.mockapi.io/items?page=${currentPage}&limit=10&${
    //       categoryId > 0 ? `category=${categoryId}` : ''
    //     }&sortBy=${sortType}`,
    //   )
    //   .then((res) => {
    //     // setTimeout(() => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //     // }, 0);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     throw err;
    //   });
    // const { data } = await axios.get(
    //   `https://62a159bdcc8c0118ef49d6b2.mockapi.io/items?page=${currentPage}&limit=10&${
    //     categoryId > 0 ? `category=${categoryId}` : ''
    //   }&sortBy=${sortType}`,
    // );
    dispatch(
      //@ts-ignore
      fetchPizzas({
        sortType,
        categoryId,
        currentPage,
      }),
    );
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
      getPizzas();
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
    .filter((obj: any) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === 'rejected' ? (
        <div className="content__error-info">
          <h2>0 pizzas found</h2>
          <p>Refresh the page or try again later. Pitsas are coming</p>
          <br></br>
        </div>
      ) : (
        <div className="content__items">{status === 'pending' ? skeletons : pizzas}</div>
      )}
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
