import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../components/headerExplore.css';
import './explore.css';

function Explore() {
  const history = useHistory();
  return (
    <div>
      <Header title="Explore" />
      <div className="buttonExplore">
        <button
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
          type="button"
        >
          Explore Foods
        </button>
        <button
          // className="buttonExplore"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
          type="button"
        >
          Explore Drinks

        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
