import {
  TLOG_REQUEST,
  TLOG_RECEIVE,
  TLOG_ERROR,
} from '../actions/TlogActions';

const initialState = {
  data: {
    author: {},
    design: {
      backgroundImageUrl: '',
      feedOpacity: '',
    },
    slug: '',
    tlog_url: '',
    my_relationship: '',
    stats: {},
  },
  slug: null,
  isFetching: false,
  error: null,
};

const actionMap = {
  [TLOG_REQUEST](state) {
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  },

  [TLOG_RECEIVE](state, data) {
    return {
      ...data,
      isFetching: false,
      error: null,
    };
  },

  [TLOG_ERROR](state, error) {
    return {
      ...state,
      ...error,
      isFetching: false,
    };
  },
};

export default function tlog(state=initialState, { type, payload }) {
  const reduceFn = actionMap[type];
  if (!reduceFn) {
    return state;
  }

  return reduceFn(state, payload);
}
