import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dispatchExpenses, sumAskValue } from '../redux/actions';

const obj = {
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class WalletForm extends Component {
  constructor() {
    super();
    this.state = obj;
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatchExpensesToRedux, AskValue } = this.props;
    const getAPI1 = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await getAPI1.json();
    const index = Object.keys(exchangeRates).indexOf(currency);
    const askIndex = Object.values(exchangeRates)[index].ask;
    const priceUpdate = parseFloat(value) * parseFloat(askIndex);
    AskValue(priceUpdate);
    const obj1 = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatchExpensesToRedux(obj1);
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
    const reset = document.getElementById('form');
    reset.reset();
  };

  render() {
    const { allCoins } = this.props;
    return (
      <div>
        <form
          id="form"
        >
          <label htmlFor="value">
            Adicionar despesa
            <input
              type="number"
              data-testid="value-input"
              onChange={ this.handleChange }
              name="value"
            />
          </label>

          <label htmlFor="description">
            Descrição da despesa
            <input
              type="text"
              data-testid="description-input"
              onChange={ this.handleChange }
              name="description"
            />
          </label>

          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
          >
            {allCoins.map((element) => <option key={ element }>{ element }</option>)}
          </select>

          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option> Dinheiro </option>
            <option> Cartão de crédito </option>
            <option> Cartão de débito </option>
          </select>

          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte </option>
            <option value="Saúde">Saúde </option>
          </select>

          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar Despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatchExpensesToRedux: PropTypes.func.isRequired,
  allCoins: PropTypes.string.isRequired,
  AskValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  allCoins: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpensesToRedux: (...value) => dispatch(dispatchExpenses(value)),
  AskValue: (value) => dispatch(sumAskValue(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
