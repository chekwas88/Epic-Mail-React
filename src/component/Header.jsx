import React from 'react';


/**
 * @method Header
 * @param {object} event React synthetic event object
 * @description Header component
 * @returns {JSX} JSX Markup
 */
const Header = () => (
  <header>
    <nav className="navbar">
      <div className="burger">
        <div>
          <span />
          <span />
          <span />
        </div>

      </div>
      <div className="logo" />
      <ul className="header-links">
        <li>
            login
        </li>
      </ul>
    </nav>
  </header>
);
export default Header;
