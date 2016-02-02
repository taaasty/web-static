import { CALENDAR_REQUEST, CALENDAR_RECEIVE, CALENDAR_ERROR } from '../actions/CalendarActions';

const initialState = {
  isFetching: false,
  tlog_id: void 0,
  periods: [],
  error: null,
};

const actionMap = {
  [CALENDAR_RECEIVE](state, calendar) {
    return {
      isFetching: false,
      error: null,
      ...calendar,
    };
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
      error,
    };
  }
};

export default function calendar(state=initialState, { type, payload }) {
  const reduceFn = actionMap[type];
  if (!reduceFn) {
    return state;
  }

  return reduceFn(state, payload);
}
