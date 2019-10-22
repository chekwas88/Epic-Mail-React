import {
  REGISTER_ERROR,
  REGISTER_USER,
  LOGIN_ERROR,
  LOGIN_USER,
  CLEAR_AUTH_ERROR,
  PROCESS_REQUEST,
  LOGOUT_USER,
} from '../actionTypes/index';


const initialState = {
  isLoggedIn: !!localStorage.userToken,
  userData: {
    email: localStorage.email || '',
    username: localStorage.username || '',
    phonenumber: localStorage.phonenumber || '',
    fullname: localStorage.fullname || ''
  },
  token: localStorage.userToken || '',
  loadingText: '',
  errors: {},
};

/**
   * @param {object} state
   * @param {object} action
   * @returns {oject} the payload
   */
const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
      return {
        ...state,
        isLoggedIn: true,
        loadingText: '',
        userData: {
          email: payload.email,
          fullname: `${payload.firstname} ${payload.lastname}`,
        },
        token: payload.token
      };
    case REGISTER_ERROR:
      return {
        ...state,
        loadingText: '',
        errors: payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
        loadingText: '',
        userData: {
          email: payload.email,
          fullname: `${payload.firstname} ${payload.lastname}`,
        },
        token: payload.token,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loadingText: '',
        errors: payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    case PROCESS_REQUEST:
      return {
        ...state,
        loadingText: 'Processing...',
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        loadingText: '',
        errors: {},
      };
    default:
      return state;
  }
};

export default authReducer;
