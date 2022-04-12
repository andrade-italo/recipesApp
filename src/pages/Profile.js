import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './profile.css';

function Profile() {
  const history = useHistory();
  const user = localStorage.getItem('user');
  const email = !!user && JSON.parse(user);

  const handleCLick = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Profile" />
      <form className="profileData">
        <p data-testid="profile-email">{email.email}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleCLick }
        >
          Logout
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default Profile;
