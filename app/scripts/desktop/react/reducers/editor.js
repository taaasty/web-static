import createReducer from './createReducer';
import {
  EDITOR_SET_ENTRY,
  EDITOR_SET_PREVIEW,
} from '../actions/EditorActions';
import { fromJS } from 'immutable';

const initialState = fromJS({
  entry: null,
  isFetching: false,
  preview: false,
});

const actionMap = {
  [EDITOR_SET_ENTRY](state, { entry }) {
    return state.merge({ entry });
  },

  [EDITOR_SET_PREVIEW](state, { preview }) {
    return state.set('preview', preview);
  },
};

export default createReducer(initialState, actionMap);
