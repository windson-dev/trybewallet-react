import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchAPI from '../redux/actions';

// const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
// const categorys = ['Alimentação', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  render() {
    const { description, value, method, tag } = this.state;
    const { allCoins } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Adicionar despesa
            <input
              data-testid="value-input"
              onChange={ this.handleChange }
              name="value"
              value={ value }
            />
          </label>

          <label htmlFor="description">
            Descrição da despesa
            <input
              data-testid="description-input"
              onChange={ this.handleChange }
              name="description"
              value={ description }
            />
          </label>

          <select
            data-testid="currency-input"
          >
            {allCoins.map((element) => <option key={ element }>{ element }</option>)}
          </select>

          <select
            data-testid="method-input"
            label="estado: "
            name="method"
            onChange={ this.handleChange }
            value={ method }
          >
            <option> Dinheiro </option>
            <option> Cartão de crédito </option>
            <option> Cartão de débito </option>
          </select>

          <select
            data-testid="tag-input"
            options="as"
            label="estado: "
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte </option>
            <option value="Saúde">Saúde </option>
          </select>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  allCoins: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  allCoins: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
