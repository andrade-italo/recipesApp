import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Foods from './pages/Foods';
import Progress from './pages/Progress';
import Explore from './pages/Explore';
import Details from './pages/Details';
import DetailsDrinks from './pages/DetailsDrinks';
import ExploreFood from './pages/ExploreFood';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreNationalities from './pages/ExploreNationalities';
import Profile from './pages/Profile';
import TelaLogin from './pages/telaLogin';
import Done from './pages/Done';
import Favorites from './pages/Favorites';
import DrinkProgress from './pages/DrinkProgress';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ TelaLogin } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Foods } />
      <Route exact path="/foods/:id" component={ Details } />
      <Route exact path="/drinks/:id" component={ DetailsDrinks } />
      <Route exact path="/foods/:id/in-progress" component={ Progress } />
      <Route exact path="/drinks/:id/in-progress" component={ DrinkProgress } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFood } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/explore/foods/ingredients" component={ ExploreIngredients } />
      <Route exact path="/explore/drinks/ingredients" component={ ExploreIngredients } />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreNationalities }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ Done } />
      <Route exact path="/favorite-recipes" component={ Favorites } />
      <Route path="/explore/drinks/nationalities" component={ NotFound } />
    </BrowserRouter>
  );
}

export default App;
