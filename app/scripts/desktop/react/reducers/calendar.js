import createReducer from './createReducer';
import {
  CALENDAR_REQUEST,
  CALENDAR_SUCCESS,
  CALENDAR_FAILURE,
  CALENDAR_RESET,
} from '../actions/CalendarActions';

const initialState = {
  isFetching: false,
  error: null,
  data: null,
};

const actionMap = {
  [CALENDAR_REQUEST](state) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    });
  },

  [CALENDAR_SUCCESS](state, { response }) {
    return Object.assign({}, state, {
      isFetching: false,
      error: null,
      data: response.result,
    });
  },

  [CALENDAR_FAILURE](state, error) {
    return Object.assign({}, state, {
      error,
      isFetching: false,
    });
  },

  [CALENDAR_RESET]() {
    return initialState;
  },
};

export default createReducer(initialState, actionMap);
