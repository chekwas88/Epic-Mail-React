import { get } from 'axios';
import { BASE_URL } from '../../Constants/Constants';
import 'regenerator-runtime';
import {
  GET_RECEIVED_MESSAGES,
  GET_RECEIVED_MESSAGES_ERROR,
  PROCESS_REQUEST,

} from '../actionTypes/index';


/**
 * @method getReceivedMessagesAction
 * @returns {object} action object
 */
const getReceivedMessagesAction = async () => {
  try {
    const payload = await get(`${BASE_URL}/messages`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
    });
    const { data } = payload.data;
    const inboxMessages = data[0].data;
    return {
      type: GET_RECEIVED_MESSAGES,
      payload: { inboxMessages }
    };
  } catch (error) {
    return {
      type: GET_RECEIVED_MESSAGES_ERROR,
      payload: error.response.data,
    };
  }
};

/**
 * @method loginAction
 * @param {object} userData
 * @returns {object} action object
 */
// const loginAction = async (userData) => {
//   try {
//     const loggedUser = await post(`${BASE_URL}/auth/login`, userData);
//     const { data } = loggedUser.data;
//     const { user } = data[0];
//     const { token } = data[0];
//     const {
//       firstname, lastname
//     } = user;
//     localStorage.setItem('fullname', `${firstname} ${lastname}`);
//     localStorage.setItem('userToken', token);
//     localStorage.setItem('userToken', token);

//     return {
//       type: LOGIN_USER,
//       payload: { ...user, token }
//     };
//   } catch (error) {
//     return {
//       type: LOGIN_ERROR,
//       payload: error.response.data,
//     };
//   }
// };

/**
 * @method processingRequest
 * @returns {object} action object
 */
const processRequest = () => ({
  type: PROCESS_REQUEST
});


export {
  getReceivedMessagesAction, processRequest,
};
