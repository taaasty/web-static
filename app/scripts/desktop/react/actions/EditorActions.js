import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { postOpts, putOpts } from './reqHelpers';
import {
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
  EDITOR_ENTRY_TYPE_IMAGE,
} from '../constants/EditorConstants';

export const EDITOR_SET_ENTRY = 'EDITOR_SET_ENTRY';
export const EDITOR_RESET_ENTRY = 'EDITOR_RESET_ENTRY';
export const EDITOR_SET_PREVIEW = 'EDITOR_SET_PREVIEW';
export const EDITOR_UPDATE_ENTRY = 'EDITOR_UPDATE_ENTRY';
export const EDITOR_SET_INSERT = 'EDITOR_SET_INSERT';
export const EDITOR_SET_LOADING_IMAGE_URL = 'EDITOR_SET_LOADING_IMAGE_URL';

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

export function editorSetEntry(entry, tlogType) {
  if (entry && entry.id) {
    const { id, createdAt, updatedAt } = entry;

    if (tlogType === TLOG_TYPE_ANONYMOUS) {
      return setEntry(restoreExistingAnonymousEntry() || entry);
    } else {
      return setEntry(restoreExistingEntry(id, updatedAt || createdAt) || entry);
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

export function pinEntry() {

}

export function saveEntry() {

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

// EDITOR_ENTRY_TYPE_IMAGE type entries only functions

const imageUrlKey = getNormalizedKey(
  EDITOR_ENTRY_TYPE_IMAGE,
  'imageUrl'
);
const imageAttachmentsKey = getNormalizedKey(
  EDITOR_ENTRY_TYPE_IMAGE,
  'imageAttachments'
);

export function createImageAttachments(files) {
  return {};
}

export function deleteImages() {
  return (dispatch) => {
    // deleteFromServer if existing entry
    dispatch(updateEntry(imageUrlKey, null));
    // deleteImageAttachments
  }
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
