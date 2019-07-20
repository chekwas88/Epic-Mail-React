import React, { Fragment, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes, {
  func, string, number
} from 'prop-types';
import 'regenerator-runtime';
import { sendMessageAction, processRequest, clearErrors } from '../redux/actions/messageActions';
import Modal from '../components/Modal';
import { InputField } from '../components/FormComponents';


/**
 * @class ComposeComponent
 * @description View for composing message
 */
export class ComposeComponent extends Component {
  /**
   * @method handleSendMessage
   * @param {object} e
   * @returns {undefined}
   */
  handleSendMessage = (e) => {
    e.preventDefault();
    const { clearMessageErrors } = this.props;
    clearMessageErrors();
    const { sendMessage, loader } = this.props;
    loader();
    sendMessage(this.state);
  }

  /**
   * @method inputChangeHandler
   * @param {object} event element node
   * @returns {undefined}
   */
  inputChangeHandler = (event) => {
    const { clearMessageErrors } = this.props;
    clearMessageErrors();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
  render() {
    const { closeModal, loadingText, errors } = this.props;
    const messageError = errors && errors.errors && errors.errors.message;
    const recipientError = errors && errors.errors && errors.errors.recipient;
    const subjectError = errors && errors.errors && errors.errors.subject;
    return (
      <Fragment>
        <Modal
          close={closeModal}
          title="New Message"
          classname="compose-layout"
        >
          <div className="compose-div">
            <div>
              <div>
                {errors.error && <p className="error">{errors.error}</p>}
                <InputField
                  type="email"
                  fieldId="recipient"
                  name="recipient"
                  placeHolder="Recipient"
                  required
                  inputChangeHandler={e => this.inputChangeHandler(e)}
                />
                {recipientError && <p className="error">{recipientError}</p>}
              </div>
              <div>
                {errors.error && <p className="error">{errors.error}</p>}
                <InputField

                  type="text"
                  fieldId="subject"
                  name="subject"
                  placeHolder="Subject"
                  required
                  inputChangeHandler={e => this.inputChangeHandler(e)}
                />
                {subjectError && <p className="error">{subjectError}</p>}
              </div>
              <div>
                {errors.error && <p className="error">{errors.error}</p>}
                <textarea id="grp-message" name="message" cols="65" rows="15" onChange={e => this.inputChangeHandler(e)} required />
                {messageError && <p className="error">{messageError}</p>}
              </div>

              <div>
                <button id="grp-compose-send" type="submit" onClick={e => this.handleSendMessage(e)}>
                  {loadingText || 'Submit'}
                </button>
                <span><i id="grp-compose-delete" className="fas fa-trash" /></span>
              </div>

            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}
/**
 * @method mapStateToProps
 * @description maps reducer states to props
 * @param {object} * destructured reducer state object
 * @returns {object} state
 */
export const mapStateToProps = ({ messages }) => {
  const {
    errors,
    loadingText,
  } = messages;
  return {
    errors,
    loadingText,
  };
};

/**
 * @method mapDispatchToProps
 * @description maps redux actions to props
 * @param {callback} dispatch destructured reducer state object
 * @returns {object} state
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    sendMessage: sendMessageAction,
    clearMessageErrors: clearErrors,
    loader: processRequest,
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComposeComponent);


ComposeComponent.propTypes = {
  closeModal: func.isRequired,
  sendMessage: func.isRequired,
  clearMessageErrors: func.isRequired,
  loader: func.isRequired,
  loadingText: string.isRequired,
  errors: PropTypes.exact({
    status: number,
    error: string,
    errors: PropTypes.exact({
      subject: string,
      message: string,
      recipient: string,
    }),
  }),
};
ComposeComponent.defaultProps = {
  errors: string,
};
