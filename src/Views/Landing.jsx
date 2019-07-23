import React, { Fragment } from 'react';
import Header from '../components/Header';
import UserAuth from './UserAuth';
import Footer from '../components/Footer';

/**
 * @method Landing
 * @description Landing View component
 * @returns {undefined}
 */
const Landing = () => (
  <Fragment>
    <Header />
    <div className="landingContainer">
      <div className="hwu">
        <h1>Welcome to Epic mail!!!</h1>
        <p>Sign up or Login to Start Sending Epic E-mails!</p>
      </div>
      <UserAuth />
      <Footer />
    </div>
  </Fragment>
);

export default Landing;
