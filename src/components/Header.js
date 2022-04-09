import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import './header.css';
import context from '../context/myContext';
import SearchBar from './SearchBar';

function Header({ title = false, needSearch = false }) {
  const history = useHistory();
  const { pathname } = history.location;
  const [visible, setVisible] = useState(false);
  const { search, setSearch } = useContext(context);

  const handleChange = ({ target: { name, value } }) => {
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const regex = pathname.match(/[^/][a-z]+$/i)[0];
  const capitalize = (element) => element[0].toUpperCase() + element.substr(1);

  return (
    <header>
      <input
        type="image"
        className="buttonIcon"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
        src={ profileIcon }
        alt="Profile"
        width="50px"
      />
      <h1 data-testid="page-title">{ title.match('/') ? capitalize(regex) : title }</h1>
      {needSearch ? (
        <input
          type="image"
          className="buttonIcon"
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="search"
          width="50px"
          onClick={ () => setVisible(!visible) }
        />
      ) : <div />}
      {visible && (
        <div>
          <input
            data-testid="search-input"
            type="text"
            name="textSearch"
            placeholder="Search recipe"
            onChange={ handleChange }
          />
          <SearchBar />
        </div>)}
    </header>
  );
}

Header.propTypes = {
  needSearch: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
