/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Fragment, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  func, string
} from 'prop-types';
import 'regenerator-runtime';
import { getMessageAction, processRequest } from '../redux/actions/messageActions';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Compose from './Compose';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import { convertTime } from '../utils/index';

/**
 * @class MessageComponent
 * @description User login/sign view component
 */
export class MessageComponent extends Component {
  state = {
    isOpen: false,
  }

  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { getReceivedMessage, loader } = this.props;
    loader();
    // eslint-disable-next-line react/destructuring-assignment
    const { messageId } = this.props.match.params;
    getReceivedMessage(messageId);
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
  * @method displayChunkMessage
   * @description displays received messages of a user
   * @param {string} msg
   * @returns {JSX} React component markup
   */
  displayChunkMessage = msg => (
    <Fragment>
      {msg.map((cm, index) => <p key={index}>{cm}</p>)}
    </Fragment>
  );

  /**
  * @method displayReceivedMessages
   * @description displays received messages of a user
   * @returns {JSX} React component markup
   */
    displayReceivedMessage = () => {
      const { message, loadingText } = this.props;
      if (!message || !message.message) {
        return (
          <div className="mail-spinner">{loadingText ? <Spinner loadingText={loadingText} /> : ''}</div>
        );
      }

      const chunkMailMessages = message.message.match(/(.|[\r\100]){1,100}/g);
      return (
        <div className="rfbttn">
          <section className="messageView">
            <h3>{message.subject}</h3>
            <div className="sr">
              <p>
                {message.sendername}
                {' '}
                <i>
                to:
                  {message.recipient}
                </i>
              </p>
              <span>{convertTime(message.createdon)}</span>
            </div>
            <div>
              {this.displayChunkMessage(chunkMailMessages)}
            </div>
          </section>
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
        isLoggedIn,
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
            </div>
            {this.displayReceivedMessage()}
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
    getReceivedMessage: getMessageAction,
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
    message,
    loadingText,
  } = messages;
  return {
    isLoggedIn,
    loadingText,
    message,
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageComponent);

MessageComponent.propTypes = {
  getReceivedMessage: func.isRequired,
  loader: func.isRequired,
  loadingText: string.isRequired,
};
