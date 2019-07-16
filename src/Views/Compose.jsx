import React, { Fragment, Component } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import {
  func
} from 'prop-types';
import 'regenerator-runtime';
// import { CompostMessagesAction, processRequest } from '../redux/actions/messageActions';
import Modal from '../components/Modal';
import { InputField } from '../components/FormComponents';


/**
 * @class ComposeComponent
 * @description View for composing message
 */
class ComposeComponent extends Component {
  /**
   * @method handleSendMessage
   * @param {object} e
   * @returns {undefined}
   */
  handleSendMessage = (e) => {
    e.preventDefault();
  }

  /**
   * @method inputChangeHandler
   * @param {object} event element node
   * @returns {undefined}
   */
  inputChangeHandler = (event) => {
    console.log('logged');

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
    const { closeModal } = this.props;
    return (
      <Fragment>
        <Modal
          close={closeModal}
          title="New Message"
          classname="compose-layout"
        >
          <div className="compose-div">
            <div>
              <InputField
                type="email"
                fieldId="recipient"
                name="recipient"
                placeHolder="Recipient"
                required
                inputChangeHandler={this.inputChangeHandler}
              />
              <InputField
                type="text"
                fieldId="subject"
                name="subject"
                placeHolder="Subject"
                required
                inputChangeHandler={this.inputChangeHandler}
              />
              <textarea id="grp-message" name="message" cols="65" rows="15" required />
              <div>
                <button id="grp-compose-send" type="submit" onClick={this.handleSendMessage}>Send</button>
                <span><i id="grp-compose-delete" className="fas fa-trash" /></span>
              </div>

            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

ComposeComponent.propTypes = {
  closeModal: func.isRequired,
};

export default ComposeComponent;
