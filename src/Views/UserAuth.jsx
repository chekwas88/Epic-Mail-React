/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-named-as-default */


import React, { Fragment, Component } from 'react';
import SignIn from '../components/Signin';
import Register from '../components/Signup';
/**
 * @class UserAuthComponent
 * @description User login/sign view component
 */
class UserAuthComponent extends Component {
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
      return (
        <Fragment>
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

export default UserAuthComponent;
