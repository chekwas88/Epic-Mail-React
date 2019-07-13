import { post } from 'axios';
import { BASE_URL } from '../../Constants/Constants';
import 'regenerator-runtime';
import {
  REGISTER_USER,
  REGISTER_ERROR,
  LOGIN_USER,
  LOGIN_ERROR,
  PROCESS_REQUEST,
  CLEAR_AUTH_ERROR,
} from '../actionTypes/index';


/**
 * @method registerAction
 * @param {object} userData
 * @returns {object} action object
 */
const registerAction = async (userData) => {
  try {
    const registerUser = await post('https://agentcorvinus-epic-mail.herokuapp.com/api/v1/auth/signup', userData);
    const { data } = registerUser.data;
    const { user } = data[0];
    const { token } = data[0];
    const {
      firstname, lastname
    } = user;
    localStorage.setItem('fullname', `${firstname} ${lastname}`);
    localStorage.setItem('userToken', token);
    return {
      type: REGISTER_USER,
      payload: { ...user, token }
    };
  } catch (error) {
    return {
      type: REGISTER_ERROR,
      payload: error.response.data,
    };
  }
};

/**
 * @method loginAction
 * @param {object} userData
 * @returns {object} action object
 */
const loginAction = async (userData) => {
  try {
    const loggedUser = await post(`${BASE_URL}/auth/login`, userData);
    const { data } = loggedUser.data;
    const { user } = data[0];
    const { token } = data[0];
    const {
      firstname, lastname
    } = user;
    localStorage.setItem('fullname', `${firstname} ${lastname}`);
    localStorage.setItem('userToken', token);
    localStorage.setItem('userToken', token);

    return {
      type: LOGIN_USER,
      payload: { ...user, token }
    };
  } catch (error) {
    return {
      type: LOGIN_ERROR,
      payload: error.response.data,
    };
  }
};

/**
 * @method clearErrors
 * @returns {object} action object
 */
const clearErrors = () => ({
  type: CLEAR_AUTH_ERROR
});

/**
 * @method processingRequest
 * @returns {object} action object
 */
const processRequest = () => ({
  type: PROCESS_REQUEST
});


export {
  registerAction, loginAction, clearErrors, processRequest,
};
