import createReducer from './createReducer';
import {
  EDITOR_SET_ENTRY,
  EDITOR_RESET_ENTRY,
  EDITOR_UPDATE_ENTRY,
  EDITOR_SET_PREVIEW,
  EDITOR_SET_INSERT,
  EDITOR_SET_LOADING_IMAGE_URL,
  EDITOR_ADD_BLOB_ATTACHMENT,
  EDITOR_UPLOAD_ATTACHMENT_REQUEST,
  EDITOR_UPLOAD_ATTACHMENT_SUCCESS,
  EDITOR_UPLOAD_ATTACHMENT_FAILURE,
  EDITOR_DELETE_ATTACHMENT_SUCCESS,
} from '../actions/EditorActions';
import {
  EDITOR_ENTRY_TYPE_TEXT,
  ENTRY_PRIVACY_PUBLIC,
} from '../constants/EditorConstants';
import { List, Map, fromJS } from 'immutable';

const defaultEntry = {
  type: EDITOR_ENTRY_TYPE_TEXT,
  privacy: ENTRY_PRIVACY_PUBLIC,
};

const initialState = fromJS({
  entry: defaultEntry,
  isSaving: false,
  isInsertingUrl: false,
  isLoadingImageUrl: false,
  isUploadingAttachments: false,
  uploadTotal: 0,
  uploadProgress: 0,
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
    return state.mergeIn(['entry'], {
      [key]: value,
    });
  },

  [EDITOR_SET_INSERT](state, { value }) {
    return state.set('isInsertingUrl', value);
  },

  [EDITOR_SET_LOADING_IMAGE_URL](state, { value }) {
    return state.set('isLoadingImageUrl', value);
  },

  [EDITOR_ADD_BLOB_ATTACHMENT](state, { attachment }) {
    return state.updateIn(
      ['entry', 'imageAttachments'],
      List(),
      (arr) => arr.push(fromJS(attachment))
    );
  },

  [EDITOR_UPLOAD_ATTACHMENT_REQUEST](state) {
    return state.set('isUploadingAttachments', true)
      .update('uploadTotal', (c) => c + 1);
  },

  [EDITOR_UPLOAD_ATTACHMENT_SUCCESS](state, { response: { result }, uuid }) {
    return state.update('uploadTotal', (c) => c - 1)
      .update(
        'isUploadingAttachments',
        () => state.get('uploadTotal', 0) !== 0
      )
      .updateIn(
        ['entry', 'imageAttachments'],
        List(),
        (arr) => {
          const idx = arr.findKey((a) => a.get('uuid') === uuid);

          return idx >= 0 ? arr.update(idx, () => fromJS(result)) : arr;
        }
      )
  },

  [EDITOR_UPLOAD_ATTACHMENT_FAILURE](state, { uuid }) {
    return state.update('uploadTotal', (c) => c - 1)
      .update(
        'isUploadingAttachments',
        () => state.get('uploadTotal', 0) !== 0
      )
      .updateIn(
        ['entry', 'imageAttachments'],
        List(),
        (arr) => {
          const idx = arr.findKey((a) => a.get('uuid') === uuid);

          return idx >= 0 ? arr.delete(idx) : arr;
        }
      )
  },

  [EDITOR_DELETE_ATTACHMENT_SUCCESS](state, { id }) {

  },
};

export default createReducer(initialState, actionMap);
