import createReducer from './createReducer';
import {
  APP_STATS_REQUEST,
  APP_STATS_SUCCESS,
  APP_STATS_FAILURE,
} from '../actions/AppStatsActions';

const initialState = {
  data: {},
  isFetching: false,
  error: null,
  updatedAt: null,
};

const actionMap = {
  [APP_STATS_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },

  [APP_STATS_SUCCESS](state, { response, updatedAt }) {
    return Object.assign({}, state, {
      updatedAt,
      data: response.result,
      isFetching: false,
      error: null,
    });
  },

  [APP_STATS_FAILURE](state, { payload }) {
    return Object.assign({}, state, {
      error: payload,
      isFetching: false,
    });
  },
};

export default createReducer(initialState, actionMap);
