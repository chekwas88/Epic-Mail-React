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
    const registerUser = await post(`${BASE_URL}/users`, userData);
    const { payload } = registerUser.data;
    const {
      email, firstname, lastname, token
    } = payload;
    localStorage.setItem('email', email);
    localStorage.setItem('fullname', `${firstname} ${lastname}`);
    localStorage.setItem('userToken', token);
    return {
      type: REGISTER_USER,
      payload: { ...payload }
    };
  } catch (error) {
    return {
      type: REGISTER_ERROR,
      payload: error.response.data
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
    const { payload } = loggedUser.data;
    console.log(payload);
    const {
      email, firstname, lastname, token
    } = payload;
    localStorage.setItem('email', email);
    localStorage.setItem('fullname', `${firstname} ${lastname}`);
    localStorage.setItem('userToken', token);

    return {
      type: LOGIN_USER,
      payload: { ...payload, }
    };
  } catch (error) {
    return {
      type: LOGIN_ERROR,
      payload: error.response.data
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
