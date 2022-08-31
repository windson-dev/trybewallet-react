import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        Table
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses
              .map(({ id, description, tag, method, value, currency, exchangeRates }) => (
                <tr
                  key={ id }
                >
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{`${value}.00`}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2) }</td>
                  <td>{(exchangeRates[currency].ask * value).toFixed(2)}</td>
                  <td>Real</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

Table.propTypes = {
  expenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Table);
