import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './progress.css';

function DrinkProgress() {
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
    const fetchDrink = async () => {
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const results = await fetch(endPoint).then((response) => response.json());
      const { drinks } = results;
      console.log(drinks);
      setFetchResponse(drinks);
      const arrAllKeysWithValue = drinks.map((element) => Object.keys(element)
        .filter((key) => element[key] !== '' && element[key] !== null));
      const ingredientKeys = arrAllKeysWithValue[0]
        .filter((item) => item.includes('strIngredient'))
        .map((item) => drinks[0][item]);
      setIngredients(ingredientKeys);
      const measureKeys = arrAllKeysWithValue[0]
        .filter((item) => item.includes('strMeasure'))
        .map((item) => drinks[0][item]);
      setMeasures(measureKeys);
    };
    fetchDrink();
  }, [id]);
  useEffect(() => {
    const teste = (JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[id]
     || ({ cocktails: { [id]: [] } }).cocktails[id]);
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
  || { cocktails: { [id]: [] } };

  const handlecheck = (event) => {
    if (event.target.checked === true) {
      setStyle(event.target.parentNode.style = 'text-decoration: line-through');
      getLocal.cocktails[id] = [...getLocal.cocktails[id], event.target.id];
      setReloadLocalStorage([...getLocal.cocktails[id]]);
    } else {
      setStyle(event.target.parentNode.style = 'text-decoration: none');
      const newLocal = Object.values(getLocal.cocktails[id]).filter((element) => (
        element !== event.target.id));
      getLocal.cocktails[id] = newLocal;
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
  console.log(fetchResponse);
  const toggleHeart = () => {
    setChangeHeart(!changeHeart);
    if (!changeHeart) {
      const objFavorita = [{
        id,
        type: 'drink',
        nationality: '',
        category: fetchResponse[0].strCategory,
        alcoholicOrNot: fetchResponse[0].strAlcoholic,
        name: fetchResponse[0].strDrink,
        image: fetchResponse[0].strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(objFavorita));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  };

  const segundos = 2000;
  const shareBtn = () => {
    const url = `http://localhost:3000/drinks/${id}`;
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
              src={ element.strDrinkThumb }
              alt="Foto do Drink"
              data-testid="recipe-photo"
            />
            <h4 data-testid="recipe-title">{element.strDrink}</h4>
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

export default DrinkProgress;
