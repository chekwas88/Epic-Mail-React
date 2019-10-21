import React, { Fragment, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import {
  func, string, bool, arrayOf, object
} from 'prop-types';
import 'regenerator-runtime';
import { getSentMessagesAction, processRequest, clearErrors } from '../redux/actions/messageActions';
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
export class SentBox extends Component {
  state = {
    isOpen: false,
  }

  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { getSentMessages, loader } = this.props;
    loader();
    getSentMessages();
  }

  /**
   * @method displayModal
   * @returns {undefined}
   */
  displayModal = () => {
    const { clearMessageErrors } = this.props;
    clearMessageErrors();
    this.setState({ isOpen: true });
  }


  /**
   * @method closeModal
   * @returns {undefined}
   */
  closeModal = () => {
    this.setState({ isOpen: false });
  }

  /**
  * @method displayReceivedMessages
   * @description displays received messages of a user
   * @returns {JSX} React component markup
   */
    displaySentMessages = () => {
      const { sentMessages } = this.props;
      if (typeof sentMessages === 'string') {
        return (
          <div className="empty-return">
            <p>{ sentMessages }</p>
          </div>
        );
      }
      return (
        <div className="layout-div">
          {sentMessages.map(m => (
            <Fragment key={m.id}>
              <Link key={m.id} className="msg-link" to={`/message/${m.id}`}>
                <div className="msg">
                  <span>
                    {m.receivername}
                  </span>
                  <span>
                    {m.subject}
                      -
                    {m.message.substring(0, 50)}
                    ...
                  </span>
                  <span>
                    {convertTime(m.createdon)}
                  </span>
                </div>
                <span className="delSpan"><i className="fas fa-trash delete" /></span>
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
        isLoggedIn,
        loadingText,
      } = this.props;

      return (
        <Fragment>
          {!isLoggedIn && <Redirect to="/landing" />}
          <Header />
          <Sidebar displayModal={this.displayModal} />
          <div className="table-div">
            { isOpen && <Compose closeModal={this.closeModal} /> }
            <div className="mail-spinner">{loadingText ? <Spinner loadingText={loadingText} /> : ''}</div>
            <div>
              <ul className="message-header">
                <li>Sender</li>
                <li>Subject-Message</li>
                <li>Time</li>
              </ul>
            </div>

            {this.displaySentMessages()}

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
    getSentMessages: getSentMessagesAction,
    loader: processRequest,
    clearMessageErrors: clearErrors,
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
    sentMessages,
    loadingText,
  } = messages;
  return {
    isLoggedIn,
    loadingText,
    sentMessages,
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SentBox);

SentBox.propTypes = {
  getSentMessages: func.isRequired,
  loader: func.isRequired,
  clearMessageErrors: func.isRequired,
  sentMessages: arrayOf(object),
  isLoggedIn: bool.isRequired,
  loadingText: string.isRequired,
};
SentBox.defaultProps = {
  sentMessages: [],
};
