import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header';

const { getByTestId } = screen;

describe('Teste se a página: ',
  () => {
    test('Contém 2 botões',
      () => {
        renderWithRouter(<Header />);
        const buttonProfile = getByTestId('profile-top-btn');
        const buttonSearch = getByTestId('search-top-btn');

        expect(buttonProfile).toBeInTheDocument();
        expect(buttonSearch).toBeInTheDocument();
      });

    test('Botão profile direciona para a rota /profile',
      () => {
        const { history } = renderWithRouter(<Header />);
        const buttonProfile = getByTestId('profile-top-btn');

        userEvent.click(buttonProfile);

        const { pathname } = history.location;

        expect(pathname).toBe('/profile');
      });

    test('Botão search abre e fecha a barra de pesquisa',
      () => {
        renderWithRouter(<Header />);
        const buttonSearch = getByTestId('search-top-btn');
        userEvent.click(buttonSearch);

        const inputSearch = getByTestId('search-input');
        expect(inputSearch).toBeInTheDocument();

        userEvent.click(buttonSearch);
        expect(inputSearch).not.toBeInTheDocument();
      });
  });
