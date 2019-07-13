/* eslint-disable react/prefer-stateless-function */
import React, { Fragment, Component } from 'react';
import Sidebar from '../components/Sidebar';


/**
 * @class Inbox
 * @description User login/sign view component
 */
class Inbox extends Component {
  /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
  render() {
    return (
      <Fragment>
        <Sidebar />
        <div className="table-div">
          <div className="layout-div">
            <div className="unread">
              <span>Ted Mosby</span>
              <span>Dear Barney, GNB is taking over...</span>
              <span>18/03/2019</span>
              <span><i className="fas fa-trash delete" /></span>
            </div>
            <div className="read">
              <span>Marshal Erickson</span>
              <span>Dear Barney, Iam in the bar...</span>
              <span>02/03/2019</span>
              <span><i className="fas fa-trash delete" /></span>
            </div>
            <div className="read">
              <span>Lily Aldrin</span>
              <span>Dude where the heck are...</span>
              <span>02/02/2019</span>
              <span><i className="fas fa-trash delete" /></span>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Inbox;
