/* eslint-disable no-console */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'regenerator-runtime';
import PropTypes, {
  func, string, number,
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
    email: '',
    password: '',
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
      const {
        email,
        password,
      } = this.state;
      const user = {
        email,
        password,
      };
      const { history } = this.props;
      event.preventDefault();
      const { loginUser, loader } = this.props;
      loader();
      loginUser(user, history);
    }

    /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
    render() {
      const { props: { errors, loadingText }, state: { password, email } } = this;
      const passwordError = errors && errors.errors && errors.errors.password;
      const emailError = errors && errors.errors && errors.errors.email;
      return (
        <form onSubmit={this.handleUserSignIn} className="userform" method="post">
          <div>
            {errors && <p className="error">{errors.error}</p>}
            <InputField
              type="email"
              fieldId="email"
              name="email"
              placeHolder="Email"
              inputChangeHandler={e => this.inputChangeHandler(e)}
              value={email}
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
              value={password}
            />
            {passwordError && <p className="error">{passwordError}</p>}
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
)(withRouter(LoginComponent));

LoginComponent.propTypes = {
  loginUser: func.isRequired,
  errors: PropTypes.exact({
    status: number,
    error: string,
    errors: PropTypes.exact({
      password: string,
      email: string,
    }),
  }),
  history: PropTypes.exact({
    length: number,
    action: string,
    location: {
      pathname: string,
      search: string,
      hash: string,
      key: string,
    }
  }),
  loader: func.isRequired,
  loadingText: string.isRequired,
  clearAuthErrors: func.isRequired,
};
LoginComponent.defaultProps = {
  errors: {},
  history: {},
};
