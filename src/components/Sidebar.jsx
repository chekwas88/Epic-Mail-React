import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @method Sidebar
 * @param {object} event React synthetic event object
 * @description Header component
 * @returns {JSX} JSX Markup
 */
const Sidebar = () => (
  <div id="mailCompo" className="side-nav hide">
    <nav>
      <ul>
        <li>
          <span><i className="fas fa-plus" /></span>
          <span>Compose</span>
        </li>
        <Link to="/inbox">
          <li>
            <span><i className="fas fa-envelope" /></span>
            <span>Inbox</span>
            <span className="numunread">1</span>
          </li>
        </Link>
        <Link to="/sent">
          <li>
            <span><i className="fas fa-check-double" /></span>
            <span>Sent</span>
          </li>
        </Link>
        <Link to="/contacts">
          <li>
            <span><i className="fas fa-address-book" /></span>
            <span>Contacts</span>
          </li>
        </Link>
        <Link to="/groups">
          <li>
            <span><i className="fas fa-users" /></span>
            <span>Groups</span>
          </li>
        </Link>
      </ul>
    </nav>
  </div>
);
export default Sidebar;
