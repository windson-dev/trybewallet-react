import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../redux/actions';

class Header extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  render() {
    const { email, totalSumValues } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            { email }
          </p>
          <p data-testid="total-field">
            { totalSumValues }
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>
        Header
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalSumValues: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
