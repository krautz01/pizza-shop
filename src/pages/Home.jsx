import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlockSkeleton";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";
import {
  setCategoryID,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

export default function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { searchValue } = React.useContext(SearchContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false)

  const categoryID = useSelector((state) => state.filter.categoryID);
  const sortType = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const onChangeCategory = (ID) => {
    dispatch(setCategoryID(ID));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const fetchPizzas = () => {
    setIsLoading(true);
    axios
      .get(
        `https://63d3ab7d8d4e68c14eafb6bd.mockapi.io/pizzas?page=${currentPage}&limit=4&${
          categoryID > 0 ? `category=${categoryID}` : ""
        }&sortBy=${sortType.sortProperty}&order=asc`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryID,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true
  }, [categoryID, sortType, currentPage]);
  
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty == params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if(!isSearch.current) {
      fetchPizzas(categoryID, currentPage)
    }
    isSearch.current = false
  }, [categoryID, sortType, currentPage]);


  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryID}
          onChangeCategory={(i) => onChangeCategory(i)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => (
              <PizzaBlockSkeleton key={index} />
            ))
          : pizzas
              .filter((pizza) => {
                if (
                  pizza.title.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  return true;
                }
                return false;
              })
              .map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
