import createReducer from './createReducer';
import {
  CALENDAR_REQUEST,
  CALENDAR_RECEIVE,
  CALENDAR_ERROR,
  CALENDAR_RESET,
} from '../actions/CalendarActions';

const initialState = {
  isFetching: false,
  error: null,
  tlogId: null,
  data: {
    tlog_id: void 0,
    periods: [],
  },
};

const actionMap = {
  [CALENDAR_RECEIVE](state, calendar) {
    return {
      isFetching: false,
      error: null,
      ...calendar,
    };
  },

  [CALENDAR_RESET](state) {
    return initialState;
  },

  [CALENDAR_REQUEST](state) {
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  },

  [CALENDAR_ERROR](state, error) {
    return {
      ...state,
      ...error,
      isFetching: false,
    };
  },
};

export default createReducer(initialState, actionMap);
