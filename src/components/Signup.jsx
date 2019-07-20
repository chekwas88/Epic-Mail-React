import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes, {
  func, string, number,
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
      const passwordError = errors && errors.errors && errors.errors.password;
      const emailError = errors && errors.errors && errors.errors.email;
      const firstNameError = errors && errors.errors && errors.errors.firstName;
      const lastNameError = errors && errors.errors && errors.errors.lastName;
      const confirmPasswordError = errors && errors.errors && errors.errors.confirmPassword;
      return (
        <form onSubmit={e => this.handleSignUp(e)} className="userform" method="post">
          <div>
            {errors.error && <p className="error">{errors.error}</p>}
            <InputField
              type="text"
              fieldId="firstname"
              name="firstName"
              placeHolder="FirstName"
              inputChangeHandler={e => this.inputChangeHandler(e)}
            />
            {firstNameError && <p className="error">{firstNameError}</p>}
          </div>
          <div>
            <InputField
              type="text"
              fieldId="lastname"
              name="lastName"
              placeHolder="LastName"
              inputChangeHandler={e => this.inputChangeHandler(e)}
            />
            {lastNameError && <p className="error">{lastNameError}</p>}
          </div>
          <div>
            <InputField
              type="email"
              fieldId="email"
              name="email"
              placeHolder="Email"
              inputChangeHandler={e => this.inputChangeHandler(e)}
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>

          <div>
            <InputField
              type="password"
              fieldId="password"
              name="password"
              placeHolder="Password"
              inputChangeHandler={e => this.inputChangeHandler(e)}
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>

          <div>
            <InputField
              type="password"
              fieldId="confirmPassword"
              name="confirmPassword"
              placeHolder="ConfirmPassword"
              inputChangeHandler={e => this.inputChangeHandler(e)}
            />
            {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
          </div>
          <div>
            <button type="submit">
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
  errors: PropTypes.exact({
    status: number,
    error: string,
    errors: PropTypes.exact({
      password: string,
      confirmPassword: string,
      email: string,
      firstName: string,
      lastName: string,
    }),
  }),
  loader: func.isRequired,
  loadingText: string.isRequired,
  clearAuthErrors: func.isRequired,
};

RegisterComponent.defaultProps = {
  errors: string,
};
