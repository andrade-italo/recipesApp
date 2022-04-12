import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './progress.css';

function Progress() {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [styleLine, setStyle] = useState('');
  const [readReloadLocalStorage, setReloadLocalStorage] = useState([]);
  const [fetchResponse, setFetchResponse] = useState([]);
  const [changeHeart, setChangeHeart] = useState(false);
  const [copy, setCopy] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    const fetchFood = async () => {
      const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const results = await fetch(endPoint).then((response) => response.json());
      const { meals: mealsDetails } = results;
      setFetchResponse(mealsDetails);
      const arrAllKeysWithValue = mealsDetails.map((element) => Object.keys(element)
        .filter((key) => element[key] !== '' && element[key] !== null));

      const ingredientKeys = arrAllKeysWithValue[0]
        .filter((item) => item.includes('strIngredient'))
        .map((item) => mealsDetails[0][item]);
      setIngredients(ingredientKeys);

      const measureKeys = arrAllKeysWithValue[0]
        .filter((item) => item.includes('strMeasure'))
        .map((item) => mealsDetails[0][item]);
      setMeasures(measureKeys);
    };
    fetchFood();
  }, [id]);
  useEffect(() => {
    const teste = (JSON.parse(localStorage.getItem('inProgressRecipes')).meals[id]
     || ({ meals: { [id]: [] } }).meals[id]);
    if (teste && teste.length) {
      setReloadLocalStorage(teste);
    }
    const setLocalFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!setLocalFavorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      const trueOrFalse = setLocalFavorite.some((item) => item.id === id);
      setChangeHeart(trueOrFalse);
    }
  }, [id]);

  const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'))
   || { meals: { [id]: [] } };

  const handlecheck = (event) => {
    if (event.target.checked === true) {
      setStyle(event.target.parentNode.style = 'text-decoration: line-through');
      getLocal.meals[id] = [...getLocal.meals[id], event.target.id];
      setReloadLocalStorage([...getLocal.meals[id]]);
    } else {
      setStyle(event.target.parentNode.style = 'text-decoration: none');
      const newLocal = Object.values(getLocal.meals[id]).filter((element) => (
        element !== event.target.id));
      getLocal.meals[id] = newLocal;
      setReloadLocalStorage(newLocal);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(getLocal));
  };
  const handleButtonCheck = () => {
    if (readReloadLocalStorage.length === ingredients.length) {
      return false;
    }
    return true;
  };

  const toggleHeart = () => {
    setChangeHeart(!changeHeart);
    // const getLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!changeHeart) {
      const objFavorite = [{
        id,
        type: 'food',
        nationality: fetchResponse[0].strArea,
        category: fetchResponse[0].strCategory,
        alcoholicOrNot: '',
        name: fetchResponse[0].strMeal,
        image: fetchResponse[0].strMealThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(objFavorite));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  };

  const segundos = 2000;
  const shareBtn = () => {
    const url = `http://localhost:3000/foods/${id}`;
    navigator.clipboard.writeText(url);
    setCopy(true);
    setTimeout(() => setCopy(false), segundos);
  };

  return (
    <main className="container">
      {
        fetchResponse.map((element, index) => (
          <div key={ index }>
            <img
              className="imgProgress"
              src={ element.strMealThumb }
              alt="Foto do Alimento"
              data-testid="recipe-photo"
            />
            <h3 data-testid="recipe-title">{element.strMeal}</h3>
            <p data-testid="recipe-category">{element.strCategory}</p>
            <div className="favoriteAndCopy">
              <input
                type="image"
                data-testid="favorite-btn"
                alt="Favorite button"
                src={ changeHeart ? blackHeartIcon : whiteHeartIcon }
                onClick={ toggleHeart }
              />
              <input
                type="image"
                data-testid="share-btn"
                alt="Share button"
                src={ shareIcon }
                onClick={ shareBtn }
              />
              { copy && <p>Link copied!</p> }
            </div>
            <p data-testid="instructions">{element.strInstructions}</p>
          </div>
        ))
      }
      <div className="labelIngredient">
        {
          (ingredients || measures) && ingredients.map((itens, index) => (
            <label
              htmlFor={ itens }
              key={ index }
              className={ styleLine }
              data-testid={ `${index}-ingredient-step` }
              style={ readReloadLocalStorage.includes(itens)
                ? { textDecorationLine: 'line-through' }
                : { textDecorationLine: 'none' } }
            >
              <input
                type="checkbox"
                id={ itens }
                checked={ readReloadLocalStorage.includes(itens) }
                onClick={ (event) => handlecheck(event) }
              />
              {`${itens} - ${measures[index]} `}
            </label>
          ))
        }
      </div>
      <button
        type="submit"
        data-testid="finish-recipe-btn"
        disabled={ handleButtonCheck() }
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe

      </button>
    </main>
  );
}
export default Progress;
