import createReducer from '../../reducers/createReducer';
import {
  MSG_MESSAGE_POST_REQUEST,
  MSG_MESSAGE_POST_SUCCESS,
  MSG_MESSAGE_POST_FAILURE,
} from '../actions/MessageActions';
import { fromJS } from 'immutable';

const initialState = fromJS({}); // { uuid: { isFetching, error, isSent } }

const actionMap = {
  [MSG_MESSAGE_POST_REQUEST](state, { uuid }) {
    return state.mergeIn([uuid], {
      isFetching: true,
      error: null,
      isSent: false,
    });
  },

  [MSG_MESSAGE_POST_SUCCESS](state, { uuid }) {
    return state.mergeIn([uuid], {
      isFetching: false,
      error: null,
      isSent: true,
    });
  },

  [MSG_MESSAGE_POST_FAILURE](state, { uuid, error }) {
    return state.mergeIn([uuid], {
      isFetching: false,
      isSent: false,
      error,
    });
  },
};

export default createReducer(initialState, actionMap);

/*

*/
