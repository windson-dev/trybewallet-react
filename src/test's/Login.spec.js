import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from '../helpers/renderWith';
import App from '../App';

describe('Testes do componente Login.js', () => {
  it('Testes do formulario de Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const getTitleForm = screen.getByRole('heading', { level: 4, name: /boas vindas ao trybewallet/i });
    expect(getTitleForm).toBeInTheDocument();
    const getEmailForm = screen.getByTestId('email-input');
    const getPasswordForm = screen.getByTestId('password-input');
    userEvent.type(getEmailForm, 'windson@trybe.com');
    userEvent.type(getPasswordForm, '123456');
    const getButtonForm = screen.getByRole('button');
    userEvent.click(getButtonForm);
    expect(history.location.pathname).toBe('/carteira');
  });
});
