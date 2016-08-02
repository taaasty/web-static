/*global i18n */
import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { postOpts, putOpts, deleteOpts } from './reqHelpers';
import {
  remove,
  restoreLastEntryPrivacy,
  restoreExistingAnonymousEntry,
  restoreExistingEntry,
  restoreExistingNewEntry,
  store,
  storeLastEntryPrivacy,
} from '../services/EntryKeeperService';
import {
  getNormalizedKey,
} from '../services/EntryNormalizationService';
import {
  TLOG_TYPE_ANONYMOUS,
  ENTRY_PRIVACY_LIVE,
  ENTRY_PRIVACY_PRIVATE,
  ENTRY_PRIVACY_PUBLIC,
  EDITOR_ENTRY_TYPE_TEXT,
  EDITOR_ENTRY_TYPE_IMAGE,
  EDITOR_ENTRY_TYPE_INSTAGRAM,
  EDITOR_ENTRY_TYPE_MUSIC,
  EDITOR_ENTRY_TYPE_VIDEO,
  EDITOR_ENTRY_TYPE_QUOTE,
  EDITOR_ENTRY_TYPE_ANONYMOUS,
} from '../constants/EditorConstants';
import {
  showGetPremiumPopup,
} from './AppStateActions';
import { generate as generateUuid } from '../../../shared/react/services/uuid';
import { createObjectURL } from '../../../shared/helpers/browser';
import NoticeService from '../services/Notice';
import { List, Map } from 'immutable';

export const EDITOR_SET_ENTRY = 'EDITOR_SET_ENTRY';
export const EDITOR_RESET_ENTRY = 'EDITOR_RESET_ENTRY';
export const EDITOR_SET_PREVIEW = 'EDITOR_SET_PREVIEW';
export const EDITOR_UPDATE_ENTRY = 'EDITOR_UPDATE_ENTRY';
export const EDITOR_SET_INSERT = 'EDITOR_SET_INSERT';
export const EDITOR_SET_LOADING_IMAGE_URL = 'EDITOR_SET_LOADING_IMAGE_URL';
export const EDITOR_ADD_BLOB_ATTACHMENT = 'EDITOR_ADD_BLOB_ATTACHMENT';
export const EDITOR_REMOVE_BLOB_ATTACHMENT = 'EDITOR_REMOVE_BLOB_ATTACHMENT';
export const EDITOR_DELETE_IMAGES = 'EDITOR_DELETE_IMAGES';

export const EDITOR_EMBED_REQUEST = 'EDITOR_EMBED_REQUEST';
export const EDITOR_EMBED_SUCCESS = 'EDITOR_EMBED_SUCCESS';
export const EDITOR_EMBED_FAILURE = 'EDITOR_EMBED_FAILURE';

export const EDITOR_UPLOAD_ATTACHMENT_REQUEST =
  'EDITOR_UPLOAD_ATTACHMENT_REQUEST';
export const EDITOR_UPLOAD_ATTACHMENT_SUCCESS =
  'EDITOR_UPLOAD_ATTACHMENT_SUCCESS';
export const EDITOR_UPLOAD_ATTACHMENT_FAILURE =
  'EDITOR_UPLOAD_ATTACHMENT_FAILURE';

export const EDITOR_DELETE_ATTACHMENT_REQUEST =
  'EDITOR_DELETE_ATTACHMENT_REQUEST';
export const EDITOR_DELETE_ATTACHMENT_SUCCESS =
  'EDITOR_DELETE_ATTACHMENT_SUCCESS';
export const EDITOR_DELETE_ATTACHMENT_FAILURE =
  'EDITOR_DELETE_ATTACHMENT_FAILURE';

export const EDITOR_SAVE_REQUEST = 'EDITOR_SAVE_REQUEST';
export const EDITOR_SAVE_SUCCESS = 'EDITOR_SAVE_SUCCESS';
export const EDITOR_SAVE_FAILURE = 'EDITOR_SAVE_FAILURE';

const PRIVACY_TYPES = {
  private: [
    ENTRY_PRIVACY_PUBLIC,
    ENTRY_PRIVACY_PRIVATE,
  ],
  public: [
    ENTRY_PRIVACY_LIVE,
    ENTRY_PRIVACY_PUBLIC,
    ENTRY_PRIVACY_PRIVATE,
  ],
};

const ERROR_CODE_PAYMENT_REQUIRED = 402;
let attachmentPromises = [];

function getPrivacyByTlogType(tlogType) {
  const privacy = restoreLastEntryPrivacy();
  const privacyTypes = PRIVACY_TYPES[tlogType];

  if (privacy != null) {
    if (privacyTypes != null) {
      return privacyTypes.indexOf(privacy) >= 0 ? privacy : privacyTypes[0];
    } else {
      return 'public';
    }
  } else {
    return privacyTypes != null ? privacyTypes[0] : 'public';
  }
}

function setEntry(entry) {
  return {
    type: EDITOR_SET_ENTRY,
    entry,
  };
}

export function pinEntry(tlogId) {
  return saveEntry(tlogId, true);
}

function prepareEntryData(state, { tlogId, wantToFix }) {
  const data = {
    tlogId,
    wantToFix,
  };
  const entry = state.editor.get('entry', Map());
  const entryType = entry.get('type', EDITOR_ENTRY_TYPE_TEXT);
  const privacy = entry.get('privacy');

  const title = entry.get(getNormalizedKey(entryType, 'title'));
  const text = entry.get(getNormalizedKey(entryType, 'text'));
  const imageAttachmentsIds = entry.get('imageAttachments', List())
    .map((a) => a.get('id'))
    .toJS();
  const imageUrl = entry.get(getNormalizedKey(entryType, 'imageUrl'));
  const embedUrl = entry.get(getNormalizedKey(entryType, 'embedUrl'));
  const source = entry.get(getNormalizedKey(entryType, 'source'));

  switch (entryType) {
  case EDITOR_ENTRY_TYPE_TEXT:
    return Object.assign(data, {
      title,
      text,
      privacy,
    });
  case EDITOR_ENTRY_TYPE_ANONYMOUS:
    return Object.assign(data, {
      title,
      text,
    });
  case EDITOR_ENTRY_TYPE_IMAGE:
    return Object.assign(data, {
      title,
      privacy,
      imageUrl,
      imageAttachmentsIds,
    });
  case EDITOR_ENTRY_TYPE_INSTAGRAM:
  case EDITOR_ENTRY_TYPE_MUSIC:
  case EDITOR_ENTRY_TYPE_VIDEO:
    return Object.assign(data, {
      title,
      privacy,
      videoUrl: embedUrl,
    });
  case EDITOR_ENTRY_TYPE_QUOTE:
    return Object.assign(data, {
      text,
      source,
      privacy,
    });
  }
}

function createEntry(entryType, data) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.create_entry_url(entryType),
      schema: Schemas.ENTRY,
      types: [EDITOR_SAVE_REQUEST, EDITOR_SAVE_SUCCESS, EDITOR_SAVE_FAILURE],
      opts: postOpts(data),
    },
  };
}

function syncEntry(entryId, entryType, data) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.update_entry_url(entryId, entryType),
      schema: Schemas.ENTRY,
      types: [EDITOR_SAVE_REQUEST, EDITOR_SAVE_SUCCESS, EDITOR_SAVE_FAILURE],
      opts: putOpts(data),
    },
    entryId,
  };
}

export function saveEntry(tlogId, wantToFix) {
  return (dispatch, getState) => {
    const entry = getState()
      .editor.get('entry', Map());
    const entryId = entry.get('id');
    let entryType = entry.get('type', EDITOR_ENTRY_TYPE_TEXT);

    function handleFail(err) {
      if (err && err.responseJSON &&
        err.responseJSON.error_code === ERROR_CODE_PAYMENT_REQUIRED) {
        return dispatch(showGetPremiumPopup());
      }
    }

    // Сохраняем Video, Instagram и Music в video точке
    if (entryType === EDITOR_ENTRY_TYPE_MUSIC ||
      entryType === EDITOR_ENTRY_TYPE_INSTAGRAM) {
      entryType = EDITOR_ENTRY_TYPE_VIDEO;
    }

    dispatch({ type: EDITOR_SAVE_REQUEST });

    if (entryId) {
      return Promise.all(attachmentPromises)
        .then(() => dispatch(syncEntry(
          entryId,
          entryType,
          prepareEntryData(getState(), { tlogId, wantToFix })
        )))
        .then((data) => {
          remove(entry.toJS());
          return data;
        })
        .catch(handleFail);
    } else {
      return Promise.all(attachmentPromises)
        .then(() => dispatch(createEntry(
          entryType,
          prepareEntryData(getState(), { tlogId, wantToFix })
        )))
        .then((data) => {
          remove(entry.toJS());
          return data;
        })
        .catch(handleFail);
    }
  }
}

export function editorSetEntry(entry, tlogType) {
  if (entry && entry.id) {
    const { id, createdAt, updatedAt } = entry;

    if (tlogType === TLOG_TYPE_ANONYMOUS) {
      return setEntry(restoreExistingAnonymousEntry() || entry);
    } else {
      return setEntry(restoreExistingEntry(id, updatedAt || createdAt) ||
        entry);
    }
  } else {
    if (tlogType === TLOG_TYPE_ANONYMOUS) {
      return setEntry(
        restoreExistingAnonymousEntry() || {
          type: 'anonymous',
          privacy: 'public',
        }
      );
    } else {
      return setEntry(
        restoreExistingNewEntry() || {
          type: 'text',
          privacy: getPrivacyByTlogType(tlogType),
        }
      );
    }
  }
}

export function editorResetEntry() {
  return {
    type: EDITOR_RESET_ENTRY,
  };
}

export function editorSetPreview(flag) {
  return {
    type: EDITOR_SET_PREVIEW,
    preview: flag,
  };
}

export function editorTogglePreview() {
  return (dispatch, getState) => {
    return dispatch(editorSetPreview(!getState()
      .editor.get('preview')));
  };
}

export function updateEntry(key, value) {
  return (dispatch, getState) => {
    dispatch({
      type: EDITOR_UPDATE_ENTRY,
      key,
      value,
    });

    store(getState()
      .editor.get('entry')
      .toJS());
  };
}

export function changeEntryType(entryType) {
  return updateEntry('type', entryType);
}

export function changeEntryPrivacy(privacy) {
  storeLastEntryPrivacy(privacy);

  return updateEntry('privacy', privacy);
}

function setInsertingUrl(value) {
  return {
    type: EDITOR_SET_INSERT,
    value,
  };
}

export function startInsert() {
  return setInsertingUrl(true);
}

export function stopInsert() {
  return setInsertingUrl(false);
}

export function createEmbed(url) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.iframely_url(),
      schema: Schemas.NONE,
      types: [
        EDITOR_EMBED_REQUEST,
        EDITOR_EMBED_SUCCESS,
        EDITOR_EMBED_FAILURE,
      ],
      opts: postOpts({ url }),
    },
  };
}

// EDITOR_ENTRY_TYPE_IMAGE type entries only functions

const imageUrlKey = getNormalizedKey(
  EDITOR_ENTRY_TYPE_IMAGE,
  'imageUrl'
);
const imageAttachmentsKey = getNormalizedKey(
  EDITOR_ENTRY_TYPE_IMAGE,
  'imageAttachments'
);

function createBlobAttachment({ width, height, src }, uuid) {
  return {
    uuid,
    image: {
      geometry: { width, height },
      url: src,
    },
  };
}

function addBlobAttachment(attachment) {
  return {
    type: EDITOR_ADD_BLOB_ATTACHMENT,
    attachment,
  };
}

function uploadAttachment(file, uuid) {
  const formData = new FormData();
  formData.append('image', file);

  return {
    [CALL_API]: {
      endpoint: ApiRoutes.imageAttachments(),
      schema: Schemas.NONE,
      types: [
        EDITOR_UPLOAD_ATTACHMENT_REQUEST,
        EDITOR_UPLOAD_ATTACHMENT_SUCCESS,
        EDITOR_UPLOAD_ATTACHMENT_FAILURE,
      ],
      opts: postOpts(formData),
    },
    uuid,
  };
}

function deleteAttachment(id) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.imageAttachmentsWithID(id),
      schema: Schemas.NONE,
      types: [
        EDITOR_DELETE_ATTACHMENT_REQUEST,
        EDITOR_DELETE_ATTACHMENT_SUCCESS,
        EDITOR_DELETE_ATTACHMENT_FAILURE,
      ],
      opts: deleteOpts(),
    },
  };
}

export function createImageAttachments(files) {
  return (dispatch, getState) => {
    attachmentPromises = [].slice.call(files)
      .map((file) => {
        // Общий uuid для imageAttachment-like blob и imageAttachment
        const uuid = generateUuid();
        let failed = false;

        // Добавляем imageAttachment-like blob объект, назначаем ему uuid
        const image = new Image();
        image.onload = () => {
          if (!failed) {
            dispatch(addBlobAttachment(createBlobAttachment(image,
              uuid)));
          }
        };
        image.src = createObjectURL(file);

        return dispatch(uploadAttachment(file, uuid))
          .then(({ response }) => {
            const idx = getState()
              .editor
              .getIn(['entry', imageAttachmentsKey], List())
              .findKey((a) => a.get('id') === response.result.id);

            if (typeof idx === 'undefined') { // attachment already removed
              return dispatch(deleteAttachment((response.result.id)));
            }
          })
          .catch(() => {
            failed = true;
            NoticeService.notifyError(
              i18n.t('editor_attachment_error', { fileName: file.name })
            );
          });
      })
    return attachmentPromises;
  };
}

export function deleteImages() {
  return (dispatch, getState) => {
    const entry = getState()
      .editor.get('entry', Map());

    if (entry.get('id')) { // remove from server if entry exists
      entry.get('imageAttachments', List())
        .forEach(
          (attachment) => dispatch(deleteAttachment(attachment.get('id')))
        );
    }

    dispatch({ type: EDITOR_DELETE_IMAGES });
  };
}

function setLoadingImageUrl(value) {
  return {
    type: EDITOR_SET_LOADING_IMAGE_URL,
    value,
  };
}

export function changeImageUrl(url) {
  return (dispatch) => {
    dispatch(setLoadingImageUrl(true));
    dispatch(updateEntry(imageUrlKey, url));

    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = (data) => {
        dispatch(setLoadingImageUrl(false));
        resolve(data);
      };

      image.onerror = (error) => {
        dispatch(setLoadingImageUrl(false));
        dispatch(updateEntry(imageUrlKey, null));
        reject(error);
      };

      image.src = url;
    });
  };
}
// -end EDITOR_ENTRY_TYPE_IMAGE functions block
