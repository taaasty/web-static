import AppStorage from '../../../shared/resources/AppStorage';

const STORAGE_PREFIX = 'entries';
const LAST_PRIVACY_KEY = 'editor:lastEntryPrivacy';

function keyNew() {
  return `${STORAGE_PREFIX}:new`;
}

function keyAnonymous() {
  return `${STORAGE_PREFIX}:anonymous`;
}

function keyExisting(id, updatedAt) {
  return `${STORAGE_PREFIX}:${id}:${new Date(updatedAt).getTime()}`;
}

function key(entry) {
  if (entry.type === 'anonymous') {
    return keyAnonymous();
  } else if (entry.id) {
    return keyExisting(entry.id, entry.updatedAt);
  } else {
    return keyNew();
  }
}

function restore(storageKey) {
  try {
    const entryData = JSON.parse(AppStorage.getItem(storageKey));
    // В старой версии редактора мы не хранили тип поста, устанавливаем 'text'
    // если не определено.
    if (entryData) {
      if (!entryData.type) {
        entryData.type = 'text';
      }

      return entryData;
    } else {
      return null;
    }
  } catch(e) {
    return null;
  }
}

export function restoreExistingEntry(id, updatedAt) {
  return restore(keyExisting(id, updatedAt));
}

export function restoreExistingNewEntry() {
  return restore(keyNew());
}

export function restoreExistingAnonymousEntry() {
  return restore(keyAnonymous());
}

export function restoreLastEntryPrivacy() {
  return AppStorage.getItem(LAST_PRIVACY_KEY) || null;
}

export function store(entry) {
  return AppStorage.setItem(key(entry), JSON.stringify(entry));
}

export function storeLastEntryPrivacy(entryPrivacy) {
  return AppStorage.setItem(LAST_PRIVACY_KEY, entryPrivacy);
}

export function remove(entry) {
  return AppStorage.removeItem(key(entry));
}
