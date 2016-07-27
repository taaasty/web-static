import createReducer from './createReducer';
import {
  EDITOR_SET_ENTRY,
  EDITOR_UPDATE_ENTRY,
  EDITOR_SET_PREVIEW,
} from '../actions/EditorActions';
import {
  ENTRY_PRIVACY_PUBLIC,
} from '../constants/EditorConstants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  entry: {
    type: 'text',
    privacy: ENTRY_PRIVACY_PUBLIC,
  },
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

  [EDITOR_UPDATE_ENTRY](state, { key, value }) {
    return state.setIn([ 'entry', key ], value);
  },
};

export default createReducer(initialState, actionMap);
