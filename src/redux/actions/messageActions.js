import { get, post } from 'axios';
import { BASE_URL } from '../../Constants/Constants';
import 'regenerator-runtime';
import {
  GET_RECEIVED_MESSAGES,
  GET_RECEIVED_MESSAGES_ERROR,
  PROCESS_REQUEST,
  SEND_MESSAGE,
  SEND_MESSAGE_ERROR,

} from '../actionTypes/index';


/**
 * @method registerAction
 * @param {object} messageBody
 * @returns {object} action object
 */
const sendMessageAction = async (messageBody) => {
  try {
    const payload = await post(`${BASE_URL}/messages`, messageBody, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
    });
    const { data } = payload.data;
    const { postedMessage } = data[0].data;

    return {
      type: SEND_MESSAGE,
      payload: { ...postedMessage }
    };
  } catch (error) {
    return {
      type: SEND_MESSAGE_ERROR,
      payload: error.response.data,
    };
  }
};

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
 * @method getSentMessagesAction
 * @returns {object} action object
 */
const getSentMessagesAction = async () => {
  try {
    const payload = await get(`${BASE_URL}/messages/sent`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
    });
    const { data } = payload.data;
    const sentMessages = data[0].data;
    return {
      type: GET_RECEIVED_MESSAGES,
      payload: { sentMessages }
    };
  } catch (error) {
    return {
      type: GET_RECEIVED_MESSAGES_ERROR,
      payload: error.response.data,
    };
  }
};

/**
 * @method processingRequest
 * @returns {object} action object
 */
const processRequest = () => ({
  type: PROCESS_REQUEST
});


export {
  getReceivedMessagesAction, getSentMessagesAction, processRequest, sendMessageAction
};
