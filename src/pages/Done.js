import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function Done() {
  const [filter, setFilter] = useState(['food', 'drink']);
  const [copy, setCopy] = useState(false);

  const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image:
        'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image:
        'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  const segundos = 1000;
  const handleCopy = (id) => {
    const url = `http://localhost:3000/foods/${id}`;
    navigator.clipboard.writeText(url);
    setCopy(true);
    setTimeout(() => setCopy(false), segundos);
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter(['food', 'drink']) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter(['food']) }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter(['drink']) }
      >
        Drinks
      </button>
      {doneRecipes
        .filter((doneRecipe) => filter.includes(doneRecipe.type))
        .map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                width="100px"
                alt="recipe"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}
              {recipe.alcoholicOrNot}
            </div>
            {/* <div id={ `${index}-horizontal-nationality` }>

            </div>
            <div id={ `${index}-horizontal-alcoholic` }>

            </div> */}
            <Link to={ `${recipe.type}s/${recipe.id}` }>
              <div data-testid={ `${index}-horizontal-name` }>{recipe.name}</div>
            </Link>
            <div data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </div>

            <input
              type="image"
              src={ shareIcon }
              alt="compartilhar"
              data-testid={ `${index}-horizontal-share-btn` }
              width="30px"
              onClick={ () => handleCopy(recipe.id) }
            />
            {copy && <p>Link copied!</p>}
            {recipe.tags.map(
              (tag, i) => i <= 1 && (
                <div
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ index }
                >
                  {tag}
                </div>
              ),
            )}

          </div>
        ))}
    </div>
  );
}

export default Done;
