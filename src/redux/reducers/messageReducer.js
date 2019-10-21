import {
  GET_RECEIVED_MESSAGES,
  GET_RECEIVED_MESSAGES_ERROR,
  GET_SENT_MESSAGES,
  GET_SENT_MESSAGES_ERROR,
  PROCESS_REQUEST,
  SEND_MESSAGE,
  SEND_MESSAGE_ERROR,
  CLEAR_MESSAGE_ERROR,
  GET_MESSAGE,
  GET_MESSAGE_ERROR
} from '../actionTypes/index';


const initialState = {
  receivedMessages: [],
  sentMessages: [],
  loadingText: '',
  errors: {},
};

/**
     * @param {object} state
     * @param {object} action
     * @returns {oject} the payload
     */
const messageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RECEIVED_MESSAGES:
      return {
        ...state,
        loadingText: '',
        receivedMessages: payload.inboxMessages,
      };
    case GET_RECEIVED_MESSAGES_ERROR:
      return {
        ...state,
        loadingText: '',
        errors: payload,
      };
    case GET_SENT_MESSAGES:
      return {
        ...state,
        loadingText: '',
        sentMessages: payload.sentMessages,
      };
    case GET_SENT_MESSAGES_ERROR:
      return {
        ...state,
        loadingText: '',
        errors: payload,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        loadingText: '',
        sendMessages: payload,
      };

    case SEND_MESSAGE_ERROR:
      return {
        ...state,
        loadingText: '',
        errors: payload,
      };
    case GET_MESSAGE:
      return {
        ...state,
        loadingText: '',
        message: payload.message,
      };
    case GET_MESSAGE_ERROR:
      return {
        ...state,
        loadingText: '',
        errors: payload,
      };
    case CLEAR_MESSAGE_ERROR:
      return {
        ...state,
        loadingText: '',
        errors: {},
      };
    case PROCESS_REQUEST:
      return {
        ...state,
        loadingText: 'Loading...',
      };
    default:
      return state;
  }
};

export default messageReducer;
