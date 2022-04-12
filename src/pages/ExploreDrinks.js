import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  const history = useHistory();

  const randomDrink = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const requisition = await fetch(url);
    const response = await requisition.json();
    const { drinks } = response;
    const drinksID = drinks[0].idDrink;
    history.push(`/drinks/${drinksID}`);
    return drinks;
  };

  return (
    <div>
      <Header title="Explore Drinks" />
      <div className="buttonsExploreType">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient

        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => randomDrink() }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
