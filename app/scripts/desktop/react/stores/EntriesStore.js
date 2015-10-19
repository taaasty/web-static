import BaseStore from './_base';
import AppDispatcher from '../dispatchers/dispatcher';
import EntriesConstants from '../constants/EntriesConstants';
import { ENTRY_PINNED_STATE } from '../constants/EntryConstants';

const entriesStore = {
  entries: [],
  nextPage: void 0,
  nextPageParam: void 0,
  nextPageField: void 0,
  limit: void 0,
  hasMore: void 0,
  isLoading: false,
  loadUrl: void 0,
};

const actionMap = {
  [EntriesConstants.ENTRIES_SET_ENTRIES](payload=[]) {
    const ids = [];
    const promos = [];

    const tmp = payload.reduce((acc, el) => {
      if (!el) {
        return acc;
      }

      // filter uniques
      if (ids.indexOf(el.entry.id) > -1) {
        return acc;
      } else {
        ids.push(el.entry.id);
      }

      // collect promo posts
      if (el.entry.fixed_state === ENTRY_PINNED_STATE) {
        promos.push(el);
        return acc;
      }

      acc.push(el);
      return acc;
    }, []);

    entriesStore.entries = promos.concat(tmp);
  },

  [EntriesConstants.ENTRIES_SET_HAS_MORE](payload) {
    entriesStore.hasMore = payload;
  },

  [EntriesConstants.ENTRIES_SET_NEXT_PAGE](payload) {
    entriesStore.nextPage = payload;
  },

  [EntriesConstants.ENTRIES_SET_NEXT_PAGE_PARAM](payload) {
    entriesStore.nextPageParam = payload;
  },

  [EntriesConstants.ENTRIES_SET_NEXT_PAGE_FIELD](payload) {
    entriesStore.nextPageField = payload;
  },

  [EntriesConstants.ENTRIES_SET_IS_LOADING](payload) {
    entriesStore.isLoading = payload;
  },

  [EntriesConstants.ENTRIES_SET_LIMIT](payload) {
    entriesStore.limit = payload;
  },

  [EntriesConstants.ENTRIES_SET_LOAD_URL](payload) {
    entriesStore.loadUrl = payload;
  },
  
};

const EntriesStore = Object.assign(
  new BaseStore(),
  {
    getEntries() {
      return entriesStore.entries;
    },

    getFirstEntryId() {
      const firstEntry = entriesStore.entries[0];
      return (firstEntry && firstEntry.entry.id);
    },

    getLoadUrl() {
      return entriesStore.loadUrl;
    },

    getNextPageField() {
      return entriesStore.nextPageField;
    },

    getNextPageData() {
      const { limit, nextPage, nextPageParam } = entriesStore;
      return {
        limit,
        [nextPageParam]: nextPage,
      };
    },

    hasMore() {
      return entriesStore.hasMore;
    },

    isLoading() {
      return entriesStore.isLoading;
    },
  }
);

EntriesStore.dispatchToken = AppDispatcher.register((payload) => {
  const fn = actionMap[payload.action.type];
  if (!fn) {
    return;
  }

  fn(payload.action.payload);
  EntriesStore.emitChange();
});

export default EntriesStore;
