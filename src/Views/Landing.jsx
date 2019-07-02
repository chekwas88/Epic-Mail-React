import React, { Fragment } from 'react';

import Header from '../component/Header';

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
    </div>
  </Fragment>
);

export default Landing;
