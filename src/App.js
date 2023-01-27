import React from 'react';
import './App.css';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

function App() {
  const [pizzas, setPizzas] = React.useState([])

  React.useEffect(() => {
    fetch('https://63d3ab7d8d4e68c14eafb6bd.mockapi.io/pizzas')
    .then((res) => {
      return res.json()
    })
    .then((arr) => {
      setPizzas(arr)
    })
  }, [])

  return (
    <div className="App">
      <div className="wrapper">
        < Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              < Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {pizzas.map((pizza) => (
                <PizzaBlock {...pizza} key={pizza.id}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
