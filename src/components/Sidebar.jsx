/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';

/**
 * @method Sidebar
 * @param {object} event React synthetic event object
 * @description Header component
 * @returns {JSX} JSX Markup
 */
const Sidebar = ({ displayModal }) => (
  <div id="mailCompo" className="side-nav hide">
    <nav>
      <ul>
        <Link to="#">
          <li
            onClick={displayModal}
            role="button"
            tabIndex={0}
          >
            <span><i className="fas fa-plus" /></span>
            <span>Compose</span>
          </li>
        </Link>

        <Link to="/inbox">
          <li>
            <span><i className="fas fa-envelope" /></span>
            <span>Inbox</span>
          </li>
        </Link>
        <Link to="/sent">
          <li>
            <span><i className="fas fa-check-double" /></span>
            <span>Sent</span>
          </li>
        </Link>
      </ul>
    </nav>
  </div>
);
export default Sidebar;
Sidebar.propTypes = {
  displayModal: func.isRequired,
};
