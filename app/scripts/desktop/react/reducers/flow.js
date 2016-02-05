import {
  FLOW_REQUEST,
  FLOW_RECEIVE,
  FLOW_ERROR,
  FLOW_UPDATE,
} from '../actions/FlowActions';

const initialState = {
  data: {
    id: null,
    flowpic: {},
    slug: '',
    tlog_url: '',
  },
  id: null,
  isFetching: false,
  error: null,
};

const actionMap = {
  [FLOW_REQUEST](state) {
    return { ...state, isFetching: true, error: null };
  },
  [FLOW_RECEIVE](state, data) {
    return { ...data, isFetching: false, error: null };
  },
  [FLOW_ERROR](state, error) {
    return { ...state, ...error, isFetching: false };
  },
  [FLOW_UPDATE](state, data) {
    return { ...state, data: { ...state.data, ...data } };
  },
};

export default function tlog(state=initialState, { type, payload }) {
  const reduceFn = actionMap[type];
  if (!reduceFn) {
    return state;
  }

  return reduceFn(state, payload);
}
