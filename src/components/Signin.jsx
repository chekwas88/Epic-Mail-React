/* eslint-disable no-console */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'regenerator-runtime';
import {
  func, object, string, objectOf,
} from 'prop-types';
import { InputField } from './FormComponents';
import Spinner from './Spinner';
import { loginAction, clearErrors, processRequest, } from '../redux/actions/authActions';

/**
 * @class SignUp
 * @description SignUp component
 * @param {object} event - Synthetic event object
 */
export class LoginComponent extends Component {
  state = {
    password: '',
    email: '',
  }

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
        [event.target.name]: event.target.value,
      });
    }

    handleUserSignIn = (event) => {
      event.preventDefault();
      const { loginUser, loader } = this.props;
      loader();
      loginUser(this.state);
    }

    /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
    render() {
      const { email, password } = this.state;
      const {
        errors, loadingText,
      } = this.props;
      return (
        <form onSubmit={this.handleUserSignIn} className="userform" method="post">
          <div>
            {errors.error && <p className="error">{errors.error}</p>}
            <InputField
              label="email"
              forAttribute="email"
              fieldType="email"
              required
              fieldId="email"
              fieldName="email"
              placeHolder="Enter Email"
              classname="form-input"
              value={email}
              inputChangeHandler={this.inputChangeHandler}
            />
          </div>
          <div>
            <InputField
              label="password"
              forAttribute="password"
              fieldType="password"
              required
              fieldId="password"
              fieldName="password"
              placeHolder="Enter Password"
              classname="form-input"
              value={password}
              inputChangeHandler={this.inputChangeHandler}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-submit">
              {loadingText ? <Spinner loadingText={loadingText} /> : 'Login'}
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
    loginUser: loginAction,
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
  mapDispatchToProps
)(LoginComponent);

LoginComponent.propTypes = {
  loginUser: func.isRequired,
  errors: objectOf(object).isRequired,
  loader: func.isRequired,
  loadingText: string.isRequired,
  clearAuthErrors: func.isRequired,
};
