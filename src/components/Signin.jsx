/* eslint-disable no-console */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'regenerator-runtime';
import propTypes, {
  func, string, number
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
      const {
        errors, loadingText,
      } = this.props;
      return (
        <form onSubmit={this.handleUserSignIn} className="userform" method="post">
          <div>
            {errors.error && <p className="error">{errors.error}</p>}
            <InputField
              type="email"
              required
              fieldId="email"
              name="email"
              placeHolder="Email"
              inputChangeHandler={this.inputChangeHandler}
            />
          </div>
          <div>
            <InputField
              type="password"
              required
              fieldId="password"
              name="password"
              placeHolder="Password"
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
  errors: propTypes.oneOfType([
    string,
    number,
  ]),

  loader: func.isRequired,
  loadingText: string.isRequired,
  clearAuthErrors: func.isRequired,
};

LoginComponent.defaultProps = {
  errors: string
};
