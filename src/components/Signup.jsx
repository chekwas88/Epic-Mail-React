import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  func, object, string, objectOf,
} from 'prop-types';
import 'regenerator-runtime';
import Spinner from './Spinner';
import { InputField } from './FormComponents';
import { registerAction, clearErrors, processRequest, } from '../redux/actions/authActions';

/**
 * @class SignUp
 * @description SignUp component
 * @param {object} event - Synthetic event object
 */
export class RegisterComponent extends Component {
  /**
   * @method componentDidMount
   * @description React lifecycle method
   * @returns {JSX} actions to be executed after componenet mounts
   */
  componentDidMount() {
    const { clearAuthErrors } = this.props;
    clearAuthErrors();
  }

    inputChangeHandler = (event) => {
      const { clearAuthErrors } = this.props;
      clearAuthErrors();
      this.setState({
        [event.target.name]: event.target.value
      });
    };

    handleSignUp = (event) => {
      const { register, loader, } = this.props;
      event.preventDefault();
      loader();
      register(this.state);
    };

    /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
    render() {
      const { errors, loadingText, } = this.props;
      return (
        <form onSubmit={this.handleSignUp} className="userform" method="post">
          <div>
            {errors.error && <p className="error">{errors.error}</p>}
            <InputField
              label="Firstname"
              forAttribute="firstname"
              fieldType="text"
              required
              fieldId="firstname"
              fieldName="firstname"
              placeHolder="FirstName"
              classname="form-input"
              inputChangeHandler={this.inputChangeHandler}
            />
            <InputField
              label="Lastname"
              forAttribute="lastname"
              fieldType="text"
              required
              fieldId="lastname"
              fieldName="lastname"
              placeHolder="LastName"
              classname="form-input"
              inputChangeHandler={this.inputChangeHandler}
            />
            <InputField
              label="email"
              forAttribute="email"
              fieldType="email"
              required
              fieldId="email"
              fieldName="email"
              placeHolder="Email"
              classname="form-input"
              inputChangeHandler={this.inputChangeHandler}
            />

            <InputField
              label="password"
              forAttribute="password"
              fieldType="password"
              required
              fieldId="password"
              fieldName="password"
              placeHolder="Password"
              classname="form-input"
              inputChangeHandler={this.inputChangeHandler}
            />
            <InputField
              label="ConfirmPassword"
              forAttribute="confirmPassword"
              fieldType="password"
              required
              fieldId="confirmPassword"
              fieldName="confirmPassword"
              placeHolder="ConfirmPassword"
              classname="form-input"
              inputChangeHandler={this.inputChangeHandler}
            />
            <button type="submit" className="btn btn-submit">
              {loadingText ? <Spinner loadingText={loadingText} /> : 'Sign Up'}
            </button>
          </div>
        </form>
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
    register: registerAction,
    clearAuthErrors: clearErrors,
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
export const mapStateToProps = ({ auth }) => {
  const {
    errors, loadingText,
  } = auth;
  return {
    errors,
    loadingText,
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterComponent);

RegisterComponent.propTypes = {
  register: func.isRequired,
  errors: objectOf(object).isRequired,
  loader: func.isRequired,
  loadingText: string.isRequired,
  clearAuthErrors: func.isRequired,
};
