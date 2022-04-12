import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import context from '../context/myContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchFoodIngredients, {
  fetchDrinkIngredients,
} from '../services/IngredientsFetch';
import fetchFoodByIngredient from '../services/FoodFetch';
import fetchDrinkByIngredient from '../services/DrinkFetch';

function ExploreIngredients() {
  const history = useHistory();
  const { pathname } = history.location;

  const { setMeals, setDrinks } = useContext(context);

  const [mealIngredients, setMealIngredients] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);

  useEffect(() => {
    (async () => {
      if (pathname === '/explore/foods/ingredients') {
        const responseMeal = await fetchFoodIngredients();
        setMealIngredients(responseMeal);
      } else if (pathname === '/explore/drinks/ingredients') {
        const responseDrink = await fetchDrinkIngredients();
        setDrinkIngredients(responseDrink);
      }
    })();
  }, [pathname]);

  const handleClickMeal = async (strIngredient) => {
    const result = await fetchFoodByIngredient(strIngredient);
    setMeals(result);
    history.push('/foods');
  };

  const hanldeClickDrink = async (strIngredient) => {
    const result = await fetchDrinkByIngredient(strIngredient);
    setDrinks(result);
    history.push('/drinks');
  };

  const MAX_LENGTH = 12;
  return (
    <div>
      <Header title="Explore Ingredients" />
      <div className="ingredientsExplore">
        {pathname === '/explore/foods/ingredients'
          ? mealIngredients.meals
          && mealIngredients.meals.map(
            ({ strIngredient }, index) => (index < MAX_LENGTH) && (
              <button
                data-testid={ `${index}-ingredient-card` }
                type="button"
                onClick={ () => handleClickMeal(strIngredient) }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                  alt="ingredient"
                />
                <div data-testid={ `${index}-card-name` }>{strIngredient}</div>
              </button>
            ),
          )
          : drinkIngredients.drinks
          && drinkIngredients.drinks.map(
            ({ strIngredient1 }, index) => (index < MAX_LENGTH) && (
              <button
                type="button"
                data-testid={ `${index}-ingredient-card` }
                onClick={ () => hanldeClickDrink(strIngredient1) }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                  alt="ingredient"
                />
                <div data-testid={ `${index}-card-name` }>{strIngredient1}</div>
              </button>
            ),
          )}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreIngredients;
