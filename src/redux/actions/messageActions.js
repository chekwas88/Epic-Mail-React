import { get, post } from 'axios';
import { BASE_URL } from '../../Constants/Constants';
import 'regenerator-runtime';
import {
  GET_RECEIVED_MESSAGES,
  GET_RECEIVED_MESSAGES_ERROR,
  PROCESS_REQUEST,
  SEND_MESSAGE,
  GET_SENT_MESSAGES,
  GET_SENT_MESSAGES_ERROR,
  GET_MESSAGE,
  GET_MESSAGE_ERROR,
  SEND_MESSAGE_ERROR,
  CLEAR_MESSAGE_ERROR,

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
      type: GET_SENT_MESSAGES,
      payload: { sentMessages }
    };
  } catch (error) {
    return {
      type: GET_SENT_MESSAGES_ERROR,
      payload: error.response.data,
    };
  }
};

/**
 * @method getMessagesAction
 * @param {int} id
 * @returns {object} action object
 */
const getMessageAction = async (id) => {
  try {
    const payload = await get(`${BASE_URL}/messages/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
    });
    const { data } = payload.data;
    const message = data[0].data;
    return {
      type: GET_MESSAGE,
      payload: { message }
    };
  } catch (error) {
    return {
      type: GET_MESSAGE_ERROR,
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

/**
 * @method clearErrors
 * @returns {object} action object
 */
const clearErrors = () => ({
  type: CLEAR_MESSAGE_ERROR
});

export {
  getReceivedMessagesAction,
  getSentMessagesAction,
  getMessageAction,
  processRequest,
  sendMessageAction,
  clearErrors
};
