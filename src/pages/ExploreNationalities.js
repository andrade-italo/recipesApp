import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import myContext from '../context/myContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchFoodsNationalities from '../services/fetchFoodsNationalities';

function ExploreNationalities() {
  const { meals } = useContext(myContext);
  const history = useHistory();
  const [nationality, setNationality] = useState([]);
  const [selectedNationalities, setSelectedNationalities] = useState('All');
  const [filter, setFilter] = useState([]);
  const { pathname } = history.location;
  const pathFoodsNacionality = pathname.includes('/explore/foods/nationalities');
  const twelve = 12;

  useEffect(() => {
    const requestNationalities = async () => {
      const data = await fetchFoodsNationalities();
      setNationality(data);
    };
    requestNationalities();
  }, []);

  useEffect(() => {
    const byNationalities = async (value) => {
      if (meals) {
        if (selectedNationalities === 'All') setFilter(meals);
        else {
          const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
          await fetch(url).then((response) => response.json())
            .then((data) => setFilter(data.meals));
        }
      }
    };
    byNationalities(selectedNationalities);
  }, [selectedNationalities, meals]);

  const handleCard = (valu) => (
    !!valu.length
    && valu.map(({ strMeal, strMealThumb, idMeal }, i) => i < twelve && (
      <Link key={ idMeal } to={ `/foods/${idMeal}` }>
        <div data-testid={ `${i}-recipe-card` }>
          <p data-testid={ `${i}-card-name` }>{strMeal}</p>
          <img
            width="100px"
            src={ strMealThumb }
            alt={ strMeal }
            data-testid={ `${i}-card-img` }
          />
        </div>
      </Link>
    ))
  );

  return (
    <div>
      <Header needSearch="true" title="Explore Nationalities" />
      <Footer />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ ({ target }) => setSelectedNationalities(target.value) }
      >
        <option data-testid="All-option" value="All">All</option>
        {
          !!nationality.meals && nationality.meals.map(({ strArea }, index) => (
            <option
              key={ index }
              value={ strArea }
              data-testid={ `${strArea}-option` }
            >
              { strArea }
            </option>
          ))
        }
      </select>
      {pathFoodsNacionality && !!filter && handleCard(filter)}
    </div>
  );
}

export default ExploreNationalities;
