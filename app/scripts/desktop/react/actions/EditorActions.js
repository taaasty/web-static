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
} from '../../constants/EditorConstants';

export const EDITOR_SET_ENTRY = 'EDITOR_SET_ENTRY';
export const EDITOR_SET_PREVIEW = 'EDITOR_SET_PREVIEW';

const PRIVACY_TYPES = {
  private: ['public', 'private'],
  public: ['live', 'public', 'private'],
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
    return dispatch(editorSetPreview(!getState().editor.preview));
  };
}
