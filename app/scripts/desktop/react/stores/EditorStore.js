import assign from 'react/lib/Object.assign';
import Constants from '../constants/constants';
import BaseStore from './_base';
import EntryNormalizationService from '../services/entryNormalization';
import EntryKeeperService from '../services/entryKeeper';
import NormalizedEntry from '../entities/normalizedEntry';
import AppDispatcher from '../dispatchers/dispatcher';

const PRIVACY_TYPES = {
  private: ['public', 'private'],
  public: ['live', 'public', 'private']
};

let _loading = false,
    _creatingAttachments = false,
    _tlog = null,
    _entry = new NormalizedEntry({
      type: 'text',
      privacy: 'public'
    });

function getPrivacyByTlogType(tlogType) {
  let privacy = EntryKeeperService.restoreLastEntryPrivacy(),
      privacyTypes = PRIVACY_TYPES[tlogType];

  if (privacy != null) {
    if (privacyTypes != null) {
      return privacyTypes.indexOf(privacy) === -1 ? privacyTypes[0] : privacy;
    } else {
      return 'public';
    }
  } else {
    return privacyTypes != null ? privacyTypes[0] : 'public';
  }
}

let EditorStore = assign(new BaseStore(), {
  getTlog() {
    return _tlog;
  },

  getEntry() {
    return _entry;
  },

  getEntryID() {
    return _entry.id;
  },

  getEntryType() {
    return _entry.type;
  },

  getEntryFlows() {
    return _entry.flows;
  },

  getEntryPrivacy() {
    return _entry.privacy;
  },

  getEntryImageAttachmentsIDs() {
    let IDs = [],
        imageAttachments = this.getEntryValue('imageAttachments');

    if (imageAttachments != null) {
      imageAttachments.forEach((item) => IDs.push(item.id));
    }

    return IDs;
  },

  getEntryValue(key) {
    return EntryNormalizationService.getNormalizedEntryValue(_entry, key);
  },

  isLoading() {
    return _loading;
  },

  isCreatingAttachments() {
    return _creatingAttachments;
  }
});

EditorStore.dispatchToken = AppDispatcher.register((payload) => {
  let action = payload.action;

  switch(action.type) {
    case Constants.editor.INIT:
      let { entry, tlog, tlogType } = action;

      if (entry != null && entry.id) {
        let { id, updated_at } = entry;

        if (tlogType === 'anonymous') {
          _entry = (
            EntryKeeperService.restoreExistingAnonymousEntry() ||
            EntryNormalizationService.normalize(entry)
          );
        } else {
          _entry = (
            EntryKeeperService.restoreExistingEntry(id, updated_at) ||
            EntryNormalizationService.normalize(entry)
          );
        }
      } else {
        if (tlogType === 'anonymous') {
          _entry = (
            EntryKeeperService.restoreExistingAnonymousEntry() ||
            new NormalizedEntry({
              type: 'anonymous',
              privacy: 'public'
            })
          );
        } else {
          _entry = (
            EntryKeeperService.restoreExistingNewEntry() ||
            new NormalizedEntry({
              type: 'text',
              privacy: getPrivacyByTlogType(tlogType)
            })
          );
        }
      }
      _tlog = tlog || null;
      break;

    case Constants.editor.UPDATE_FIELD:
      let { key, value } = action;
      let normalizedKey = EntryNormalizationService.getNormalizedKey(_entry, key);

      if (normalizedKey != null) {
        _entry[normalizedKey] = value;
        EntryKeeperService.store(_entry);
      }
      break;

    case Constants.editor.CHANGE_TYPE:
      _entry.type = action.entryType;
      EntryKeeperService.store(_entry);
      break;

    case Constants.editor.CHANGE_PRIVACY:
      _entry.privacy = action.entryPrivacy;
      EntryKeeperService.store(_entry);
      EntryKeeperService.storeLastEntryPrivacy(action.entryPrivacy);
      break;

    case Constants.editor.ENTRY_SAVE:
      _loading = true;
      break;

    case Constants.editor.ENTRY_SAVE_SUCCESS:
      EntryKeeperService.remove(_entry);
      break;

    case Constants.editor.ENTRY_SAVE_ERROR:
      _loading = false;
      break;

    case Constants.editor.ENTRY_CREATING_ATTACHMENTS_START:
      _creatingAttachments = true;
      break;

    case Constants.editor.ENTRY_CREATING_ATTACHMENTS_END:
      _creatingAttachments = false;
      break;

    defaults:
      return true;
  }
  EditorStore.emitChange();
});

export default EditorStore;