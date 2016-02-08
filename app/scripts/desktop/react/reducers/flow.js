import {
  FLOW_REQUEST,
  FLOW_RECEIVE,
  FLOW_ERROR,
  FLOW_UPDATE,
  FLOW_STAFF_ADD,
  FLOW_STAFF_REMOVE,
  FLOW_STAFF_ROLE,
  FLOW_VIEW_STYLE,
} from '../actions/FlowActions';
import {
  VIEW_STYLE_TLOG,
} from '../constants/ViewStyleConstants';

export const FLOW_VIEW_STYLE_LS_KEY = 'flowViewStyle';

const initialState = {
  data: {
    id: null,
    flowpic: {},
    staffs: [],
    slug: '',
    tlog_url: '',
  },
  id: null,
  isFetching: false,
  error: null,
  viewStyle: VIEW_STYLE_TLOG,
};

const actionMap = {
  [FLOW_REQUEST](state) {
    return { ...state, isFetching: true, error: null };
  },
  [FLOW_RECEIVE](state, data) {
    return { ...state, ...data, isFetching: false, error: null };
  },
  [FLOW_ERROR](state, error) {
    return { ...state, ...error, isFetching: false };
  },
  [FLOW_UPDATE](state, data) {
    return { ...state, data: { ...state.data, ...data } };
  },
  [FLOW_STAFF_ADD](state, staff) {
    return {
      ...state,
      data: {
        ...state.data,
        staffs: [ ...state.data.staffs, staff ],
      },
      isFetching: false,
      error: null,
    };
  },
  [FLOW_STAFF_REMOVE](state, staff) {
    return {
      ...state,
      data: {
        ...state.data,
        staffs: state.data.staffs.filter((s) => s.user.id !== staff.user.id),
      },
      isFetching: false,
      error: null,
    };
  },
  [FLOW_STAFF_ROLE](state, { staff, role }) {
    return {
      ...state,
      data: {
        ...state.data,
        staffs: state.data.staffs.map((s) => s.user.id === staff.user.id ? { ...s, role } : s),
      },
      isFetching: false,
      error: null,
    };
  },
  [FLOW_VIEW_STYLE](state, style) {
    window.localStorage.setItem(FLOW_VIEW_STYLE_LS_KEY, style);
    return {
      ...state,
      viewStyle: style,
    }
  },
};

export default function tlog(state=initialState, { type, payload }) {
  const reduceFn = actionMap[type];
  if (!reduceFn) {
    return state;
  }

  return reduceFn(state, payload);
}
