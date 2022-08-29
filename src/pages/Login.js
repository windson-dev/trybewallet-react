import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  validateEmailAndPassword = () => {
    const { email, password } = this.state;
    const isEmailValid = (email.includes('@')
        && (email.toLowerCase().includes('.com')));
    const lengthPassword = 6;
    const isPasswordValid = (password.length >= lengthPassword);
    return isEmailValid && isPasswordValid;
  };

  handleFormSubmit = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(email);
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <h4>
            Boas vindas ao TrybeWallet
          </h4>

          <label htmlFor="email">
            E-mail:
            <input
              type="text"
              data-testid="email-input"
              name="email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>

          <label htmlFor="password">
            Senha:
            <input
              type="password"
              data-testid="password-input"
              name="password"
              onChange={ this.handleChange }
              value={ password }
            />
          </label>

          <button
            type="submit"
            onClick={ () => this.handleFormSubmit() }
            disabled={ !this.validateEmailAndPassword() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: (value) => dispatch(changeEmail(value)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
