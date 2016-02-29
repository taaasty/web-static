import createReducer from './createReducer';
import {
  APP_STATS_REQUEST,
  APP_STATS_RECEIVE,
  APP_STATS_ERROR,
} from '../actions/AppStatsActions';

const initialState = {
  data: {},
  isFetching: false,
  error: null,
  updatedAt: null,
};

const actionMap = {
  [APP_STATS_RECEIVE](state, data) {
    return {
      ...state,
      ...data,
      isFetching: false,
      error: null,
    };
  },

  [APP_STATS_REQUEST](state) {
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  },

  [APP_STATS_ERROR](state, error) {
    return {
      ...state,
      error,
      isFetching: false,
    };
  },
};

export default createReducer(initialState, actionMap);
