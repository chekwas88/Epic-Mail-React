import {
  GET_RECEIVED_MESSAGES,
  GET_RECEIVED_MESSAGES_ERROR,
  PROCESS_REQUEST,
} from '../actionTypes/index';


const initialState = {
  receivedMessages: [],
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
    case PROCESS_REQUEST:
      return {
        ...state,
        loadingText: 'Processing...',
      };
    default:
      return state;
  }
};

export default messageReducer;
