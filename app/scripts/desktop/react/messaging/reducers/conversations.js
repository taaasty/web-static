import createReducer from '../../reducers/createReducer';
import {
  MSG_NOTIFY_READY_REQUEST,
  MSG_NOTIFY_READY_SUCCESS,
  MSG_NOTIFY_READY_FAILURE,
} from '../actions/PusherActions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  isFetching: false,
  error: null,
});

const actionMap = {
  [MSG_NOTIFY_READY_REQUEST](state) {
    return state.merge({
      isFetching: true,
      error: null,
    });
  },

  [MSG_NOTIFY_READY_SUCCESS](state) {
    return state.merge({
      isFetching: false,
      error: null,
    });
  },

  [MSG_NOTIFY_READY_FAILURE](state, { error }) {
    return state.merge({
      isFetching: false,
      error,
    })
  },
};

export default createReducer(initialState, actionMap);
