import AppStorage from '../../../shared/resources/AppStorage';
import createReducer from './createReducer';
import {
  FLOW_REQUEST,
  FLOW_SUCCESS,
  FLOW_FAILURE,
  FLOW_VIEW_STYLE,
} from '../actions/FlowActions';
import {
  VIEW_STYLE_TLOG,
} from '../constants/ViewStyleConstants';

export const FLOW_VIEW_STYLE_LS_KEY = 'flowViewStyle';

const initialState = {
  isFetching: false,
  error: null,
  viewStyle: AppStorage.getItem(FLOW_VIEW_STYLE_LS_KEY) || VIEW_STYLE_TLOG,
};

const actionMap = {
  [FLOW_REQUEST](state) {
    return Object.assign({}, state, { isFetching: true, error: null });
  },
  [FLOW_SUCCESS](state) {
    return Object.assign({}, state, { isFetching: false, error: null });
  },
  [FLOW_FAILURE](state, { error }) {
    return Object.assign({}, state, { isFetching: false, error });
  },
  [FLOW_VIEW_STYLE](state, { style }) {
    AppStorage.setItem(FLOW_VIEW_STYLE_LS_KEY, style);
    return Object.assign({}, state, { viewStyle: style });
  },
};

export default createReducer(initialState, actionMap);
