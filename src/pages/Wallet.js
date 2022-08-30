import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchAPI } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  render() {
    const { email, totalSum } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ totalSum }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        {/* <Header /> */}
        <WalletForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalSum: state.wallet.ask,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  totalSum: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
