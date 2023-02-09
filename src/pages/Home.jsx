import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlockSkeleton";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";
import { setCategoryID } from "../redux/slices/filterSlice";

export default function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1)
  const { searchValue } = React.useContext(SearchContext);

  const dispatch = useDispatch();
  const categoryID = useSelector((state) => state.filter.categoryID);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const onChangeCategory = (ID) => {
    dispatch(setCategoryID(ID));
  };


  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63d3ab7d8d4e68c14eafb6bd.mockapi.io/pizzas?page=${currentPage}&limit=4&${
        categoryID > 0 ? `category=${categoryID}` : ""
      }&sortBy=${sortType.sortProperty}&order=asc`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
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
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
