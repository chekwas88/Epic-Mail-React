/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  func, string, arrayOf, object, bool
} from 'prop-types';
import 'regenerator-runtime';
import { getReceivedMessagesAction, processRequest } from '../redux/actions/messageActions';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Compose from './Compose';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import { convertTime } from '../utils/index';

/**
 * @class Inbox
 * @description User login/sign view component
 */
export class InboxComponent extends Component {
  state = {
    isOpen: false,
  }

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
   * @method closeModal
   * @returns {undefined}
   */
  closeModal = () => {
    this.setState({ isOpen: false });
  }

  /**
   * @method displayModal
   * @returns {undefined}
   */
  displayModal = () => {
    this.setState({ isOpen: true });
  }


    /**
  * @method displayReceivedMessages
   * @description displays received messages of a user
   * @returns {JSX} React component markup
   */
    displayReceivedMessages = () => {
      const { receivedMessages } = this.props;
      if (typeof receivedMessages === 'string') {
        return (
          <div className="empty-return">
            <p>{receivedMessages}</p>
          </div>
        );
      }
      return (
        <div className="layout-div">
          {
            receivedMessages.map(m => (
              <Fragment key={m.id}>
                <Link className="msg-link" to={`/message/${m.id}`}>
                  <div className="msg">
                    <span>
                      {m.sendername}
                    </span>
                    <span>
                      {m.message.substring(0, 50)}
                  ...
                    </span>
                    <span>
                      {convertTime(m.createdon)}
                    </span>
                  </div>
                </Link>
              </Fragment>
            ))}
        </div>
      );
    };

    /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
    render() {
      const { isOpen } = this.state;
      const {
        loadingText,
        isLoggedIn
      } = this.props;

      return (

        <Fragment>
          { !isLoggedIn && <Redirect to="/" />}
          <Header />
          <Sidebar displayModal={this.displayModal} />
          <div className="table-div">
            { isOpen && <Compose closeModal={this.closeModal} /> }

            <div>
              <div className="mail-spinner">{loadingText ? <Spinner loadingText={loadingText} /> : ''}</div>
              <ul className="message-header">
                <li>Sender</li>
                <li>Message</li>
                <li>Time</li>
              </ul>
            </div>
            {this.displayReceivedMessages()}
          </div>
          <Footer />
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
    loadingText,
    receivedMessages,
    isLoggedIn,
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InboxComponent);

InboxComponent.propTypes = {
  getReceivedMessages: func.isRequired,
  loader: func.isRequired,
  receivedMessages: arrayOf(object),
  loadingText: string.isRequired,
  isLoggedIn: bool.isRequired
};
InboxComponent.defaultProps = {
  receivedMessages: [],
};
