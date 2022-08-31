import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dispatchExpenses, sumAskValue } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  handleClick = async () => {
    const { id, value, currency } = this.state;
    const { dispatchExpensesToRedux, askValue } = this.props;
    const getAPI1 = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await getAPI1.json();

    const getCoinByIndexApi = Object.keys(exchangeRates).indexOf(currency);
    const getCoinPrice = Object.values(exchangeRates)[getCoinByIndexApi].ask;
    const coinConvertToBRL = parseFloat(value) * parseFloat(getCoinPrice);
    askValue(coinConvertToBRL);

    const saveObject = {
      ...this.state,
      exchangeRates,
    };

    dispatchExpensesToRedux(saveObject);
    this.setState({
      id: id + 1,
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
    document.getElementById('form').reset();
  };

  render() {
    const { allCoins } = this.props;
    return (
      <form
        id="form"
      >
        <label htmlFor="value">
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

        <div>
          <button
            onClick={ this.handleClick }
            type="button"
          >
            Adicionar despesa
          </button>
        </div>

      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatchExpensesToRedux: PropTypes.func.isRequired,
  allCoins: PropTypes.string.isRequired,
  askValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  allCoins: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpensesToRedux: (...value) => dispatch(dispatchExpenses(value)),
  askValue: (value) => dispatch(sumAskValue(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
