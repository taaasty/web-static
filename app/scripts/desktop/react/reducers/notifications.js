import createReducer from './createReducer';
import { fromJS } from 'immutable';
import {
  NOTIFICATIONS_GET_REQUEST,
  NOTIFICATIONS_GET_SUCCESS,
  NOTIFICATIONS_GET_FAILURE,
} from '../actions/NotificationsActions';

const initialState = fromJS({
  totalCount: {}, // [filter]: count
  isFetching: false,
  error: null,
});

const actionMap = {
  [NOTIFICATIONS_GET_REQUEST](state) {
    return state.merge({
      isFetching: true,
      error: null,
    });
  },

  [NOTIFICATIONS_GET_SUCCESS](state, { response, filter }) {
    return state.mergeDeep({
      totalCount: {
        [filter]: response.result.totalCount,
      },
      isFetching: false,
      error: null,
    });
  },

  [NOTIFICATIONS_GET_FAILURE](state, { error }) {
    return state.merge({
      isFetching: false,
      error,
    });
  },
};

export default createReducer(initialState, actionMap);
