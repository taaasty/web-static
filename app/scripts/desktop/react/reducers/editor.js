import createReducer from './createReducer';
import {
  EDITOR_SET_ENTRY,
  EDITOR_RESET_ENTRY,
  EDITOR_UPDATE_ENTRY,
  EDITOR_SET_PREVIEW,
} from '../actions/EditorActions';
import {
  EDITOR_ENTRY_TYPE_TEXT,
  ENTRY_PRIVACY_PUBLIC,
} from '../constants/EditorConstants';

import { fromJS } from 'immutable';

const defaultEntry = {
  type: EDITOR_ENTRY_TYPE_TEXT,
  privacy: ENTRY_PRIVACY_PUBLIC,
};

const initialState = fromJS({
  entry: defaultEntry,
  isFetching: false,
  preview: false,
});

const actionMap = {
  [EDITOR_SET_ENTRY](state, { entry }) {
    return state.merge({ entry });
  },

  [EDITOR_RESET_ENTRY](state) {
    return state.merge({ entry: defaultEntry });
  },

  [EDITOR_SET_PREVIEW](state, { preview }) {
    return state.set('preview', preview);
  },

  [EDITOR_UPDATE_ENTRY](state, { key, value }) {
    return state.setIn(['entry', key], value);
  },
};

export default createReducer(initialState, actionMap);
