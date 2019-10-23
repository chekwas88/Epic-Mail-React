/* eslint-disable jsx-a11y/click-events-have-key-events */


import React, { Fragment, Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import SignIn from '../components/Signin';
import Register from '../components/Signup';
/**
 * @class UserAuthComponent
 * @description User login/sign view component
 */
export class UserAuthComponent extends Component {
    state = {
      register: false,
      login: true,
    }

    handlesignUpOnClick = () => {
      this.setState({
        register: true,
        login: false,
      });
    }

    handlesignInOnClick = () => {
      this.setState({
        register: false,
        login: true,
      });
    }

    /**
   * @method render
   * @description React render method
   * @returns {JSX} React component markup
   */
    render() {
      const { login, register } = this.state;
      const { isLoggedIn } = this.props;
      return (
        <Fragment>
          { isLoggedIn && <Redirect to="/inbox" />}
          <div className="container">
            <div>
              <nav>
                <div
                  onClick={this.handlesignInOnClick}
                  className={login ? 'active' : ''}
                  role="button"
                  tabIndex={0}
                >
                  Login
                </div>
                <div
                  onClick={this.handlesignUpOnClick}
                  className={register ? 'active' : ''}
                  role="button"
                  tabIndex={0}
                >
                    SignUp
                </div>
              </nav>


              {(register && <Register />) || <SignIn />}

            </div>
          </div>
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
export const mapStateToProps = ({ auth }) => {
  const {
    isLoggedIn,
  } = auth;
  return {
    isLoggedIn
  };
};


export default connect(
  mapStateToProps,
)(withRouter(UserAuthComponent));

UserAuthComponent.propTypes = {
  isLoggedIn: bool.isRequired
};
