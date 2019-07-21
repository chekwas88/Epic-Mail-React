/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bool } from 'prop-types';


/**
 * @method Header
 * @param {object} event React synthetic event object
 * @description Header component
 * @returns {JSX} JSX Markup
 */
export class Header extends Component {
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
            <Link to="/inbox">Inbox</Link>
          </li>
          <li>
            <Link to="/sent">Sent</Link>
          </li>
          <li>
            <Link to="/groups">Groups</Link>
          </li>
        </Fragment>
      );
    }
    return (
      <header>
        <nav className="navbar">
          <div className="logo" />
          <ul className="header-links">
            {headerContent}
          </ul>
        </nav>
      </header>
    );
  }
}

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
export default connect(mapStateToProps)(Header);

Header.propTypes = {
  isLoggedIn: bool.isRequired,
};
