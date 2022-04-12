import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';

function TelaLogin() {
  const [isValidEmail, setIsValidEmail] = useState('');
  const [isValidPassword, setIsValidPassword] = useState('');

  const validadeEmailAndPassword = () => {
    const validadeEmailRgx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const validadePassword = 6;
    if (isValidEmail === ''
    || !validadeEmailRgx.test(isValidEmail)
    || isValidPassword.length <= validadePassword) {
      return true;
    }
  };

  const sendTokenToLocalStorage = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: isValidEmail }));
  };

  return (
    <div className="supimpa">
      <p>Supimpas Food</p>
      <div className="containerLogin">
        <input
          type="email"
          placeholder="Digite seu Email"
          data-testid="email-input"
          onChange={ (event) => setIsValidEmail(event.target.value) }
        />
        <input
          className="inputLogin"
          type="password"
          placeholder="Digite sua Senha"
          data-testid="password-input"
          onChange={ (event) => setIsValidPassword(event.target.value) }
        />
        <Link to="/foods">
          <button
            type="button"
            disabled={ validadeEmailAndPassword() }
            data-testid="login-submit-btn"
            onClick={ sendTokenToLocalStorage }
          >
            Enter

          </button>
        </Link>
      </div>
    </div>
  );
}
// TelaLogin.propTypes = {
//   history: PropTypes.oneOfType([PropTypes.object]),
// };
// TelaLogin.defaultProps = {
//   history: PropTypes.oneOfType([PropTypes.object]),
// };
export default TelaLogin;
