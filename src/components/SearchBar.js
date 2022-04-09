import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import context from '../context/myContext';
import fetchFoodByIngredient, {
  fetchFoodByFirstLetter,
  fetchFoodByName,
} from '../services/FoodFetch';
import fetchDrinkByIngredient, {
  fetchDrinkByFirstLetter,
  fetchDrinkByName,
} from '../services/DrinkFetch';

function SearchBar() {
  const { search, setSearch } = useContext(context);
  const { setDrinks, setMeals } = useContext(context);
  const history = useHistory();
  const { pathname } = history.location;
  const handleChange = ({ target: { name, value } }) => {
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const alertZeroRecipe = 'Sorry, we haven\'t found any recipes for these filters.';

  const handleIngredientFoodSearch = async () => {
    let result = {};
    const { textSearch } = search;
    result = await fetchFoodByIngredient(textSearch);
    setMeals(result);
    console.log(result);
    if (result === undefined || result.meals === null) {
      console.log('entrou');
      result = { meals: [] };
      global.alert(alertZeroRecipe);
    }
    if (result.meals.length === 1) {
      const { idMeal } = result.meals[0];
      history.push(`/foods/${idMeal}`);
    }
  };

  const handleNameFoodSearch = async () => {
    let result = {};
    const { textSearch } = search;
    result = await fetchFoodByName(textSearch);
    setMeals(result);
    console.log(result);
    if (result === undefined || result.meals === null) {
      result = { meals: [] };
      global.alert(alertZeroRecipe);
    }
    if (result.meals.length === 1) {
      const { idMeal } = result.meals[0];
      history.push(`/foods/${idMeal}`);
    }
  };

  const handleFirstLetterFoodSearch = async () => {
    let result = {};
    const { textSearch } = search;
    if (textSearch.length === 1) {
      result = await fetchFoodByFirstLetter(textSearch);
      setMeals(result);
      if (result === undefined || result.meals === null) {
        result = { meals: [] };
        global.alert(alertZeroRecipe);
      }
      if (result.meals.length === 1) {
        const { idMeal } = result.meals[0];
        history.push(`/foods/${idMeal}`);
      }
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const handleFoodFetch = async () => {
    const { radioSearch } = search;
    switch (radioSearch) {
    case 'ingredient':
      handleIngredientFoodSearch();
      break;
    case 'name':
      handleNameFoodSearch();
      break;
    case 'first-letter':
      handleFirstLetterFoodSearch();
      break;
    default:
      console.log('error');
    }
  };

  const handleIngredientDrinkSearch = async () => {
    let result = {};
    const { textSearch } = search;
    result = await fetchDrinkByIngredient(textSearch);
    setDrinks(result);
    if (result === undefined || result.drinks === null) {
      result = { drinks: [] };
      global.alert(alertZeroRecipe);
    }
    if (result.drinks.length === 1) {
      const { idDrink } = result.drinks[0];
      history.push(`/drinks/${idDrink}`);
    }
  };

  const handleNameDrinkSearch = async () => {
    let result = {};
    const { textSearch } = search;
    result = await fetchDrinkByName(textSearch);
    setDrinks(result);
    if (result === undefined || result.drinks === null) {
      result = { drinks: [] };
      global.alert(alertZeroRecipe);
    }
    if (result.drinks.length === 1) {
      const { idDrink } = result.drinks[0];
      history.push(`/drinks/${idDrink}`);
    }
  };

  const handleFirstLetterDrinkSearch = async () => {
    let result = {};
    const { textSearch } = search;
    if (textSearch.length === 1) {
      result = await fetchDrinkByFirstLetter(textSearch);
      setDrinks(result);
      if (result === undefined || result.drinks === null) {
        result = { drinks: [] };
        global.alert(alertZeroRecipe);
      }
      if (result.drinks.length === 1) {
        const { idDrink } = result.drinks[0];
        history.push(`/drinks/${idDrink}`);
      }
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const handleDrinkFetch = () => {
    const { radioSearch } = search;
    switch (radioSearch) {
    case 'ingredient':
      handleIngredientDrinkSearch();
      break;
    case 'name':
      handleNameDrinkSearch();
      break;
    case 'first-letter':
      handleFirstLetterDrinkSearch();
      break;
    default:
      console.log('error');
    }
  };

  const handleClickButton = async () => {
    if (pathname.match(/drinks/)) {
      handleDrinkFetch();
    } else {
      handleFoodFetch();
    }
  };

  return (
    <>
      <div>
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingredient"
          name="radioSearch"
          onChange={ handleChange }
        />
        Ingredient
        <input
          data-testid="name-search-radio"
          type="radio"
          value="name"
          name="radioSearch"
          onChange={ handleChange }
        />
        Name
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          value="first-letter"
          name="radioSearch"
          onChange={ handleChange }
        />
        First Letter
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClickButton }
      >
        Search
      </button>
    </>
  );
}

export default SearchBar;
