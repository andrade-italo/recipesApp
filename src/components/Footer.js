import React from 'react';
import { useHistory } from 'react-router';
import './footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button
        type="button"
        className="footerIcon"
        onClick={ () => history.push('/drinks') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </button>
      <button
        type="button"
        className="footerIcon"
        onClick={ () => history.push('/explore') }
      >
        <img
          src={ exploreIcon }
          alt="Explore Icon"
          data-testid="explore-bottom-btn"
        />
      </button>
      <button
        type="button"
        className="footerIcon"
        onClick={ () => history.push('/foods') }
      >
        <img
          src={ mealIcon }
          alt="Meal Icon"
          data-testid="food-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
