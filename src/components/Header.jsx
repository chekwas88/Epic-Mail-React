/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bool, func } from 'prop-types';
import { logoutAction } from '../redux/actions/authActions';


/**
 * @class Header
 * @description Header component
 */
export class Header extends Component {
  /**
   * @method logout
   * @description user logout method
   * @returns {JSX} React component markup
   */
  logout = () => {
    const { logoutUser } = this.props;
    logoutUser();
    this.props.history.push('/');
  }

  /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
  render() {
    const { isLoggedIn } = this.props;
    let headerContent = '';
    if (isLoggedIn) {
      headerContent = (
        <Fragment>
          <li>
            <Link className="logout" to="/" onClick={this.logout}>Logout</Link>
          </li>
        </Fragment>
      );
    }
    return (
      <header>
        <nav className="navbar">
          <h3 className="namedisplay">{localStorage.getItem('fullname')}</h3>
          <Link to="/" className="logo">
            <li>
              <span><i className="fab fa-bandcamp" /></span>
              <span>Home</span>
            </li>
          </Link>
          <ul className="header-links">
            {headerContent}
          </ul>
        </nav>
      </header>
    );
  }
}
/**
 * @method mapDispatchToProps
 * @description maps redux actions to props
 * @param {callback} dispatch destructured reducer state object
 * @returns {object} state
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    logoutUser: logoutAction,
  },
  dispatch
);

/**
 * @method mapStateToProps
 * @description maps reducer states to props
 * @param {object} * destructured reducer state object
 * @returns {object} state
 */
export const mapStateToProps = ({ auth }) => {
  const { isLoggedIn } = auth;
  return {
    isLoggedIn,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

Header.propTypes = {
  isLoggedIn: bool.isRequired,
  logoutUser: func.isRequired,
};
