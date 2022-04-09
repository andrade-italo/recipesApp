import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [search, setSearch] = useState({
    textSearch: '',
    radioSearch: '',
  });

  const context = {
    ...meals,
    ...drinks,
    search,
    setSearch,
    setMeals,
    setDrinks,
  };

  useEffect(() => {
    const allFoodsFetch = async () => {
      const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const results = await fetch(endPoint).then((response) => response.json());
      setMeals(results);
    };
    const allDrinksFetch = async () => {
      const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const results = await fetch(endPoint).then((response) => response.json());
      setDrinks(results);
    };

    allFoodsFetch();
    allDrinksFetch();
  }, []);

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
};
Provider.defaultProps = {
  children: PropTypes.node,
};
export default Provider;
