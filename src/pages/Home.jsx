import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlockSkeleton";

export default function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryID, setCategoryID] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63d3ab7d8d4e68c14eafb6bd.mockapi.io/pizzas?${
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
  }, [categoryID, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryID}
          onChangeCategory={(i) => setCategoryID(i)}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => (
              <PizzaBlockSkeleton key={index} />
            ))
          : pizzas.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)}
      </div>
    </div>
  );
}
