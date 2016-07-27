import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { postOpts, putOpts } from './reqHelpers';
import {
  restoreLastEntryPrivacy,
  restoreExistingAnonymousEntry,
  restoreExistingEntry,
  restoreExistingNewEntry,
} from '../services/EntryKeeperService';
import {
  normalize,
} from '../services/EntryNormalizationService';
import {
  TLOG_TYPE_ANONYMOUS,
  ENTRY_PRIVACY_LIVE,
  ENTRY_PRIVACY_PRIVATE,
  ENTRY_PRIVACY_PUBLIC,
} from '../constants/EditorConstants';

export const EDITOR_SET_ENTRY = 'EDITOR_SET_ENTRY';
export const EDITOR_SET_PREVIEW = 'EDITOR_SET_PREVIEW';
export const EDITOR_UPDATE_ENTRY = 'EDITOR_UPDATE_ENTRY';

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
  if (entry != null && entry.id) {
    const { id, updatedAt } = entry;

    if (tlogType === TLOG_TYPE_ANONYMOUS) {
      setEntry(restoreExistingAnonymousEntry() || normalize(entry));
    } else {
      setEntry(restoreExistingEntry(id, updatedAt) || normalize(entry));
    }
  } else {
    if (tlogType === TLOG_TYPE_ANONYMOUS) {
      setEntry(
        restoreExistingAnonymousEntry() ||
          { type: 'anonymous', privacy: 'public' }
      );
    } else {
      setEntry(
        restoreExistingNewEntry() ||
          { type: 'text', privacy: getPrivacyByTlogType(tlogType) }
      );
    }
  }
}

export function editorResetEntry() {
  return setEntry(null);
}

export function editorSetPreview(flag) {
  return {
    type: EDITOR_SET_PREVIEW,
    preview: flag,
  };
}

export function editorTogglePreview() {
  return (dispatch, getState) => {
    return dispatch(editorSetPreview(!getState().editor.get('preview')));
  };
}

export function updateEntry(key, value) {
  return {
    type: EDITOR_UPDATE_ENTRY,
    key,
    value,
  };
}

export function changeEntryType(entryType) {
  return updateEntry('type', entryType);
}

export function changeEntryPrivacy(privacy) {
  return updateEntry('privacy', privacy);
}
