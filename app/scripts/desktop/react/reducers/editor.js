import createReducer from './createReducer';
import {
  EDITOR_SET_ENTRY,
  EDITOR_RESET_ENTRY,
  EDITOR_UPDATE_ENTRY,
  EDITOR_SET_PREVIEW,
  EDITOR_SET_INSERT,
  EDITOR_SET_LOADING_IMAGE_URL,
  EDITOR_ADD_BLOB_ATTACHMENT,
  EDITOR_REMOVE_BLOB_ATTACHMENT,
  EDITOR_DELETE_IMAGES,
  EDITOR_UPLOAD_ATTACHMENT_REQUEST,
  EDITOR_UPLOAD_ATTACHMENT_SUCCESS,
  EDITOR_UPLOAD_ATTACHMENT_FAILURE,
  EDITOR_DELETE_ATTACHMENT_SUCCESS,
  EDITOR_EMBED_REQUEST,
  EDITOR_EMBED_SUCCESS,
  EDITOR_EMBED_FAILURE,
  EDITOR_SAVE_REQUEST,
  EDITOR_SAVE_SUCCESS,
  EDITOR_SAVE_FAILURE,
} from '../actions/EditorActions';
import {
  EDITOR_ENTRY_TYPE_TEXT,
  ENTRY_PRIVACY_PUBLIC,
} from '../constants/EditorConstants';
import { List, fromJS } from 'immutable';

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

function attachmentsUploadStatusUpdater(state) {
  const attachments = state.getIn(['entry', 'imageAttachments'], List());
  const total = attachments.count();
  const progress = attachments
    .filter((a) => a.get('id') != null)
    .count();
  const isFinised = progress >= total;

  return state.merge({
    isUploadingAttachments: !isFinised,
    uploadTotal: isFinised ? 0 : total,
    uploadProgress: isFinised ? 0 : progress,
  });
}

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

  [EDITOR_EMBED_REQUEST](state) {
    return state.set('isFetchingEmbed', true);
  },

  [EDITOR_EMBED_SUCCESS](state) {
    return state.set('isFetchingEmbed', false);
  },

  [EDITOR_EMBED_FAILURE](state) {
    return state.set('isFetchingEmbed', false);
  },

  [EDITOR_SET_LOADING_IMAGE_URL](state, { value }) {
    return state.set('isLoadingImageUrl', value);
  },

  [EDITOR_ADD_BLOB_ATTACHMENT](state, { attachment }) {
    return state
      .updateIn(
        ['entry', 'imageAttachments'],
        List(),
        (arr) => arr.push(fromJS(attachment))
      )
      .update(attachmentsUploadStatusUpdater);
  },

  [EDITOR_REMOVE_BLOB_ATTACHMENT](state, { uuid }) {
    return state
      .updateIn(
        ['entry', 'imageAttachments'],
        List(),
        (arr) => {
          const idx = arr.findKey((a) => a.get('uuid') === uuid);

          return idx >= 0 ? arr.delete(idx) : arr;
        }
      )
      .update(attachmentsUploadStatusUpdater);
  },

  [EDITOR_DELETE_IMAGES](state) {
    return state
      .mergeIn(['entry'], {
        imageUrl: null,
        imageAttachments: [],
      })
      .update(attachmentsUploadStatusUpdater);
  },

  [EDITOR_UPLOAD_ATTACHMENT_REQUEST](state) {
    return state
      .update(attachmentsUploadStatusUpdater);
  },

  [EDITOR_UPLOAD_ATTACHMENT_SUCCESS](state, { response: { result }, uuid }) {
    return state
      .updateIn(
        ['entry', 'imageAttachments'],
        List(),
        (arr) => {
          const idx = arr.findKey((a) => a.get('uuid') === uuid);

          return idx >= 0 ? arr.update(idx, () => fromJS(result)) : arr;
        }
      )
      .update(attachmentsUploadStatusUpdater);
  },

  [EDITOR_UPLOAD_ATTACHMENT_FAILURE](state, { uuid }) {
    return state
      .updateIn(
        ['entry', 'imageAttachments'],
        List(),
        (arr) => {
          const idx = arr.findKey((a) => a.get('uuid') === uuid);

          return idx >= 0 ? arr.delete(idx) : arr;
        }
      )
      .update(attachmentsUploadStatusUpdater);
  },

  [EDITOR_DELETE_ATTACHMENT_SUCCESS](state, { id }) {
    return state.updateIn(
      ['entry', 'imageAttachments'],
      List(),
      (arr) => {
        const idx = arr.findKey((a) => a.get('id') === id);

        return idx >= 0 ? arr.delete(idx) : arr;
      }
    );
  },

  [EDITOR_SAVE_REQUEST](state) {
    return state.set('isSaving', true);
  },

  [EDITOR_SAVE_SUCCESS](state) {
    return state.set('isSaving', false);
  },

  [EDITOR_SAVE_FAILURE](state) {
    return state.set('isSaving', false);
  },
};

export default createReducer(initialState, actionMap);
