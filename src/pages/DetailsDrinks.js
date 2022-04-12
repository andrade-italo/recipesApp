import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import MyContext from '../context/myContext';
import './details.css';
import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function Details() {
  const [details, setDetails] = useState([]);
  const [all, setAll] = useState([]);

  const [copy, setCopy] = useState(false);
  const { meals } = useContext(MyContext);
  const history = useHistory();

  const { pathname } = history.location;
  const pathId = pathname.match(/[0-9]+$/)[0];
  const doneInit = localStorage.getItem('doneRecipes');
  const done = !!doneInit && JSON.parse(doneInit);
  const initial = localStorage.getItem('inProgressRecipes');
  const initAlternative = {
    cocktails: { },
  };
  const init = JSON.parse(initial) || initAlternative;
  // const has = Object.hasOwnProperty.call(init, 'cocktails');
  const favoriteStorage = localStorage.getItem('favoriteRecipes');

  const favorite = !!favoriteStorage && JSON.parse(favoriteStorage);
  const [favoriteHeart, setFavoriteHeart] = useState(
    !!favorite && favorite.some((e) => e.id === pathId),
  );

  const favoriteObj = {
    id: details.idDrink,
    type: 'drink',
    nationality: details.strArea || '',
    category: details.strCategory,
    alcoholicOrNot: details.strAlcoholic,
    name: details.strDrink,
    image: details.strDrinkThumb,
  };

  useEffect(() => {
    const fetchDetailsDrinks = async (id) => {
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      await fetch(endPoint).then((response) => response.json())
        .then((results) => setDetails(results.drinks[0]));
      setAll(meals);
    };
    fetchDetailsDrinks(pathId);
  }, [pathId, meals]);

  const regex = (e) => `strMeasure${e.replace(/[^0-9]/g, '')}`;
  const six = 6;

  const ingredient = [];

  const handleFavorite = () => {
    setFavoriteHeart(!favoriteHeart);
    if (favorite) {
      const trueOrFalse = favorite.every(({ id }) => id !== favoriteObj.id);
      if (trueOrFalse) {
        favorite.push(favoriteObj);
      } else {
        favorite.forEach(({ id }, i) => (id === favoriteObj.id)
        && favorite.splice(i, 1));
      }
    }
    return (
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorite || [favoriteObj])));
  };

  const handleClick = () => {
    init.cocktails = { [pathId]: ingredient };
    localStorage.setItem('inProgressRecipes', JSON.stringify(init || initAlternative));
    history.push(`${pathname}/in-progress`);
  };

  const segundos = 1000;
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopy(true);
    setTimeout(() => setCopy(false), segundos);
  };

  const cardDetails = (strThumb, strName, strCategory) => (
    <div className="details">
      <h3 data-testid="recipe-title">{strName}</h3>
      <p data-testid="recipe-category">{strCategory}</p>
      <img
        alt="foto"
        data-testid="recipe-photo"
        width="100px"
        src={ strThumb }
      />
      <div className="favoriteAndCopy">
        <input
          type="image"
          src={ favoriteHeart ? blackHeartIcon : heartIcon }
          alt="favorite"
          data-testid="favorite-btn"
          width="30px"
          onClick={ handleFavorite }
        />
        {copy && <p>Link copied!</p>}
        <input
          type="image"
          src={ shareIcon }
          alt="compartilhar"
          data-testid="share-btn"
          width="30px"
          onClick={ handleCopy }
        />
      </div>
    </div>
  );
  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = details;
  return (
    !!details && (
      <div className="detailsContainer">
        {cardDetails(strDrinkThumb, strDrink, strAlcoholic)}
        <div className="labelIngredient">
          {(Object.keys(details).filter((e) => e.includes('Ingredient') && !!details[e]))
            .map((e, i) => (
              <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                {`- ${details[e]}`}
                {ingredient.push(details[e])}
                {details[regex(e)] && ` - ${details[regex(e)]}`}
              </p>
            ))}
        </div>

        <p data-testid="instructions">{strInstructions}</p>
        <div className="body">
          <input type="radio" name="position" />
          <input type="radio" name="position" />
          <input type="radio" name="position" />
          <input type="radio" name="position" />
          <input type="radio" name="position" />
          <input type="radio" name="position" />
          <main id="carousel">
            {!!all && all.map(({ idMeal, strMealThumb, strMeal }, i) => i < six
            && (
              <div
                className="item"
                key={ i }
                data-testid={ `${i}-recomendation-card` }
                to={ `${pathname}/${idMeal}` }
              >
                <div>
                  <img
                    width="100px"
                    src={ strMealThumb }
                    alt={ strMeal }
                  />
                  <p data-testid={ `${i}-recomendation-title` }>
                    {strMeal}
                  </p>
                </div>
              </div>
            ))}
          </main>
        </div>
        {(!done || done.some(({ id }) => id !== details.idDrink))
            && (
              <button
                type="button"
                className="start"
                data-testid="start-recipe-btn"
                onClick={ handleClick }
              >
                {((!!init.cocktails && Object.keys(init.cocktails).some((id) => (
                  id === details.idDrink)) && 'Continue Recipe') || 'Iniciar receita')}
              </button>)}
      </div>
    ));
}
export default Details;
