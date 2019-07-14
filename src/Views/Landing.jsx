import React, { Fragment } from 'react';
import Header from '../components/Header';
import UserAuth from './UserAuth';

/**
 * @method Landing
 * @description Landing View component
 * @returns {undefined}
 */
const Landing = () => (
  <Fragment>
    <Header />
    <div className="landingContainer">
      <h1>Welcome to epic mail</h1>
      <UserAuth />
    </div>
  </Fragment>
);

export default Landing;
