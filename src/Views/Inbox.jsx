/* eslint-disable react/prefer-stateless-function */
import React, { Fragment, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  func, string, bool, arrayOf, object
} from 'prop-types';
import 'regenerator-runtime';
import { getReceivedMessagesAction, processRequest } from '../redux/actions/messageActions';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Spinner from '../components/Spinner';

/**
 * @class Inbox
 * @description User login/sign view component
 */
export class Inbox extends Component {
  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { getReceivedMessages, loader } = this.props;
    loader();
    getReceivedMessages();
  }

  /**
  * @method displayReceivedMessages
   * @description displays received messages of a user
   * @returns {JSX} React component markup
   */
    displayReceivedMessages = () => {
      const { receivedMessages } = this.props;
      if (!receivedMessages.length > 1) {
        return (
          <div>
            <p>You have no inbox message</p>
          </div>
        );
      }
      return receivedMessages.map(m => (
        <Fragment key={m.id}>
          <div className="msg">
            <span>
              {m.sendername}
            </span>
            <span>
              {m.message.substring(0, 50)}
              ...
            </span>
            <span>
              {m.createdon}
            </span>
          </div>
          <span className="delSpan"><i className="fas fa-trash delete" /></span>
        </Fragment>

      ));
    };

    /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
    render() {
      const {
        isLoggedIn,
        loadingText,
      } = this.props;

      return (
        <Fragment>
          {!isLoggedIn && <Redirect to="/landing" />}
          <Header />
          <Sidebar />
          <div className="table-div">
            <div className="layout-div">
              {loadingText ? <Spinner loadingText={loadingText} /> : ''}
              {this.displayReceivedMessages()}
            </div>
          </div>
        </Fragment>
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
    getReceivedMessages: getReceivedMessagesAction,
    loader: processRequest,
  },
  dispatch
);
/**
 * @method mapStateToProps
 * @description maps reducer states to props
 * @param {object} * destructured reducer state object
 * @returns {object} state
 */
export const mapStateToProps = ({ auth, messages }) => {
  const { isLoggedIn } = auth;
  const {
    receivedMessages,
    loadingText,
  } = messages;
  return {
    isLoggedIn,
    loadingText,
    receivedMessages,
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inbox);

Inbox.propTypes = {
  getReceivedMessages: func.isRequired,
  loader: func.isRequired,
  receivedMessages: arrayOf(object),
  isLoggedIn: bool.isRequired,
  loadingText: string.isRequired,
};
Inbox.defaultProps = {
  receivedMessages: [],
};
