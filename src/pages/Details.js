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
  const { drinks } = useContext(MyContext);
  const history = useHistory();
  const { pathname } = history.location;
  const pathId = pathname.match(/[0-9]+$/)[0];

  useEffect(() => {
    const fetchDetailsFood = async (id) => {
      const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      await fetch(endPoint).then((response) => response.json())
        .then((results) => setDetails(results.meals[0]));
      setAll(drinks);
    };
    fetchDetailsFood(pathId);
  }, [pathId, drinks]);

  const regex = (e) => `strMeasure${e.replace(/[^0-9]/g, '')}`;
  const eleven = -11;
  const six = 6;

  // const ingredient = [];

  const doneInit = localStorage.getItem('doneRecipes');
  const done = !!doneInit && JSON.parse(doneInit);
  const initial = localStorage.getItem('inProgressRecipes');

  const initAlternative = {
    meals: { },
  };
  const init = JSON.parse(initial) || initAlternative;
  const has = Object.hasOwnProperty.call(init, 'meals');

  const favoriteStorage = localStorage.getItem('favoriteRecipes');
  const favorite = !!favoriteStorage && JSON.parse(favoriteStorage);
  const [favoriteHeart, setFavoriteHeart] = useState(
    !!favorite && favorite.some((e) => e.id === pathId),
  );

  const favoriteObj = {
    id: details.idMeal,
    type: 'food',
    nationality: details.strArea || '',
    category: details.strCategory,
    alcoholicOrNot: '',
    name: details.strMeal,
    image: details.strMealThumb,
  };

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
    if (has) init.meals[pathId] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(init));
    history.push(`${pathname}/in-progress`);
  };

  const segundos = 1000;
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopy(true);
    setTimeout(() => setCopy(false), segundos);
  };

  const cardDetails = (item) => (
    <div className="details">
      <h3 data-testid="recipe-title">{`${item.strMeal}`}</h3>
      <p data-testid="recipe-category">
        {`${item.strCategory}` }
      </p>
      <img
        alt="foto"
        data-testid="recipe-photo"
        width="100px"
        src={ item.strMealThumb }
      />
      <div className="favoriteAndCopy">
        <input
          type="image"
          src={ favoriteHeart ? blackHeartIcon : heartIcon }
          alt="favorite"
          data-testid="favorite-btn"
          onClick={ handleFavorite }
        />
        {copy && <p>Link copied!</p>}
        <input
          type="image"
          src={ shareIcon }
          alt="compartilhar"
          data-testid="share-btn"
          onClick={ handleCopy }
        />
      </div>
    </div>
  );

  return (
    !!details.strYoutube && (
      <div className="detailsContainer">
        {cardDetails(details)}
        <div className="labelIngredient">
          {(Object.keys(details).filter((e) => e.includes('Ingredient') && !!details[e]))
            .map((e, i) => (
              <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                {`- ${details[e]}`}
                {details[regex(e)] && ` - ${details[regex(e)]}`}
              </p>
            ))}
        </div>
        <iframe
          className="video"
          data-testid="video"
          height="211"
          src={ `https://www.youtube.com/embed/${details.strYoutube.slice(eleven)}` }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture"
          allowFullScreen
        />
        <p data-testid="instructions">{details.strInstructions}</p>
        <div className="body">
          <input type="radio" name="position" />
          <input type="radio" name="position" />
          <input type="radio" name="position" />
          <input type="radio" name="position" />
          <input type="radio" name="position" />
          <input type="radio" name="position" />
          <main id="carousel">
            {!!all && all.map(({ idDrink, strDrinkThumb, strDrink }, i) => i < six
            && (
              <div
                className="item"
                key={ i }
                data-testid={ `${i}-recomendation-card` }
                to={ `${pathname}/${idDrink}` }
              >
                <img
                  width="100px"
                  src={ strDrinkThumb }
                  alt={ strDrink }
                />
                <p data-testid={ `${i}-recomendation-title` }>
                  {strDrink}
                </p>
              </div>
            ))}
          </main>
        </div>
        {(!done || done.some(({ id }) => id !== details.idMeal))
            && (
              <button
                type="button"
                className="start"
                data-testid="start-recipe-btn"
                onClick={ handleClick }
              >
                {((has && Object.keys(init.meals).some((id) => (id === details.idMeal))
                  && 'Continue Recipe') || 'Iniciar receita')}
              </button>)}
      </div>
    ));
}
export default Details;
