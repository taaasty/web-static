import createReducer from './createReducer';
import {
  EDITOR_SET_ENTRY,
  EDITOR_SET_PREVIEW,
} from '../actions/EditorActions';

const initialState = {
  entry: null,
  preview: false,
};

const actionMap = {
  [EDITOR_SET_ENTRY](state, { payload }) {
    return {
      ...state,
      entry: payload,
    };
  },

  [EDITOR_SET_PREVIEW](state, { payload }) {
    return {
      ...state,
      preview: payload,
    };
  },
};

export default createReducer(initialState, actionMap);
