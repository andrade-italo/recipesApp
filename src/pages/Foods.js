import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/myContext';
import './foods.css';
// import SearchBar from '../components/SearchBar';

function Foods() {
  const [all, setAll] = useState([]);
  const [category, setCategory] = useState([]);
  const { meals, drinks } = useContext(MyContext);
  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    const spyContext = () => {
      setAll({ meals, drinks });
    };
    const categoryMealsFetch = async () => {
      const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const results = await fetch(endPoint).then((response) => response.json());
      setCategory((prev) => ({ ...prev, ...results }));
    };
    const categoryDrinksFetch = async () => {
      const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      await fetch(endPoint).then((response) => response.json())
        .then((results) => setCategory((prev) => ({ ...prev, ...results })));
    };

    spyContext();
    categoryDrinksFetch();
    categoryMealsFetch();
  }, [drinks, meals, pathname]);

  const twelve = 12;
  const five = 5;

  const drinkPath = pathname.match(/drinks/);

  const handleCard = (foodsOrDrinks) => (
    all[foodsOrDrinks].map((e, i) => i < twelve && (
      <div className="foodCard">
        <Link key={ e.idMeal || e.idDrink } to={ `${pathname}/${e.idMeal || e.idDrink}` }>
          <div
            data-testid={ `${i}-recipe-card` }
          >
            <img
              width="100px"
              src={ e.strMealThumb || e.strDrinkThumb }
              alt={ e.strMeal || e.strDrink }
              data-testid={ `${i}-card-img` }
            />
            <p data-testid={ `${i}-card-name` }>{e.strMeal || e.strDrink}</p>
          </div>
        </Link>
      </div>
    )));

  const handleClick = async (strCategory) => {
    if (strCategory === all.filter) return setAll({ meals, drinks });
    const endPoint = `https://www.${drinkPath ? 'thecocktaildb' : 'themealdb'}.com/api/json/v1/1/filter.php?c=${strCategory}`;
    const results = await fetch(endPoint).then((response) => response.json());
    setAll((prev) => ({ ...prev, ...results, filter: strCategory }));
  };

  return (
    <div>
      <Header needSearch="true" title={ pathname } />
      <div className="allButton">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setAll({ meals, drinks }) }
        >
          All
        </button>
        {!!category.meals && !!category.drinks && (
          drinkPath ? (category.drinks) : (category.meals))
          .map(({ strCategory }, index) => (
            index < five && (
              <button
                type="button"
                key={ strCategory }
                data-testid={ `${strCategory}-category-filter` }
                onClick={ () => handleClick(strCategory) }
              >
                {strCategory}
              </button>

            )
          ))}
      </div>
      <div className="allCard">
        {!drinkPath && !!all.meals && handleCard('meals')}
        {drinkPath && !!all.drinks && handleCard('drinks')}
      </div>

      <Footer />
    </div>
  );
}

export default Foods;
