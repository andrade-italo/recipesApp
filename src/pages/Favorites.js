import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';

function Favorites() {
  const [copy, setCopy] = useState(false);
  const favoriteStorage = JSON.parse((localStorage.getItem('favoriteRecipes') || '[]'));
  const [favoriteState, setFavoriteState] = useState([...favoriteStorage]);
  const [removeItem, setRemoveItem] = useState(false);

  useEffect(() => {
    const teste = () => {
      if (removeItem) {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify(favoriteStorage.filter(({ id }) => (id !== removeItem))));
        setRemoveItem(false);
      }
    };
    teste();
  }, [removeItem, favoriteStorage]);

  const segundos = 1000;
  const handleCopy = (id, type) => {
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
    setCopy(true);
    setTimeout(() => setCopy(false), segundos);
  };

  const handleFavorite = (elementId) => {
    setFavoriteState(favoriteState.filter(({ id }) => (id !== elementId)));
    setRemoveItem(elementId);
  };

  const handleCard = (teste) => (
    !!teste && teste.map(
      ({ id, name, image, type, alcoholicOrNot, category, nationality }, i) => (
        (
          <div key={ id }>
            <Link to={ `/${type}s/${id}` }>
              <p data-testid={ `${i}-horizontal-name` }>{ name }</p>
              <p data-testid={ `${i}-horizontal-top-text` }>
                {type === 'food' && nationality}
                {` - ${alcoholicOrNot || category}`}
              </p>
              <img
                type="image"
                width="100px"
                src={ image }
                alt={ name }
                data-testid={ `${i}-horizontal-image` }
              />
            </Link>
            <input
              type="image"
              src={ blackHeartIcon }
              alt="favorite"
              data-testid={ `${i}-horizontal-favorite-btn` }
              width="30px"
              onClick={ () => handleFavorite(id) }
            />
            <input
              type="image"
              src={ shareIcon }
              alt="compartilhar"
              data-testid={ `${i}-horizontal-share-btn` }
              width="30px"
              onClick={ () => handleCopy(id, type) }
            />
            {copy && <p>Link copied!</p>}
          </div>)
      ),
    ));

  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFavoriteState(favoriteStorage) }
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => setFavoriteState(favoriteStorage
          .filter(({ type }) => type === 'food')) }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFavoriteState(favoriteStorage
          .filter(({ type }) => type === 'drink')) }
      >
        Drink
      </button>
      {handleCard(favoriteState)}
    </div>
  );
}

export default Favorites;
