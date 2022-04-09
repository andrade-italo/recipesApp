import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFood() {
  const history = useHistory();

  const randomFood = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const requisition = await fetch(url);
    const response = await requisition.json();
    const { meals } = response;
    const mealsID = meals[0].idMeal;
    history.push(`/foods/${mealsID}`);
    return meals;
  };
  return (
    <div>
      <Header title="Explore Foods" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => randomFood() }
      >
        Surprise me!

      </button>
      <Footer />
    </div>
  );
}

export default ExploreFood;
