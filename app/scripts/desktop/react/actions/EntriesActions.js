import EntryActionCreators from './Entry';
import AppDispatcher from '../dispatchers/dispatcher';
import EntriesStore from '../stores/EntriesStore';
import EntriesConstants from '../constants/EntriesConstants';

function setIsLoading(payload) {
  AppDispatcher.handleViewAction({
    payload,
    type: EntriesConstants.ENTRIES_SET_IS_LOADING,
  });
}

function setHasMore(payload) {
  AppDispatcher.handleViewAction({
    payload,
    type: EntriesConstants.ENTRIES_SET_HAS_MORE,
  });
}

function setEntries(payload) {
  AppDispatcher.handleViewAction({
    payload,
    type: EntriesConstants.ENTRIES_SET_ENTRIES,
  });
}

function setNextPage(payload) {
  AppDispatcher.handleViewAction({
    payload,
    type: EntriesConstants.ENTRIES_SET_NEXT_PAGE,
  });
}

function setNextPageParam(payload) {
  AppDispatcher.handleViewAction({
    payload,
    type: EntriesConstants.ENTRIES_SET_NEXT_PAGE_PARAM,
  });
}

function setNextPageField(payload) {
  AppDispatcher.handleViewAction({
    payload,
    type: EntriesConstants.ENTRIES_SET_NEXT_PAGE_FIELD,
  });
}

function setLoadUrl(payload) {
  AppDispatcher.handleViewAction({
    payload,
    type: EntriesConstants.ENTRIES_SET_LOAD_URL,
  });
}

const EntriesActions = {
  init({ entries_info, loadUrl, nextPageFieldName, nextPageParamName }) {
    setEntries(entries_info.items);
    setHasMore(entries_info.has_more);
    setNextPage(entries_info[nextPageFieldName]);
    setNextPageParam(nextPageParamName);
    setNextPageField(nextPageFieldName);
    setLoadUrl(loadUrl);
  },

  loadMoreEntries() {
    const data = EntriesStore.getNextPageData();
    const loadUrl = EntriesStore.getLoadUrl();

    setIsLoading(true);

    EntryActionCreators.load(loadUrl, data)
      .then((entriesInfo) => {
        const entries = EntriesStore.getEntries();
        const nextPageField = EntriesStore.getNextPageField();

        // Обрабатываем случай, когда передан левый урл. Если в ответе нет нужных
        // нам полей, просто прекращаем дальнейшую загрузку
        if (entriesInfo.has_more != null) {
          setEntries(entries.concat(entriesInfo.items));
          setHasMore(entriesInfo.has_more);
          setNextPage(entriesInfo[nextPageField]);
        } else {
          setHasMore(false);
        }
      })
      .fail(() => setHasMore(false))
      .always(() => setIsLoading(false));
  },

  loadNewEntries(tillEntryId, count) {
    if (!tillEntryId) {
      return null;
    }

    const loadUrl = EntriesStore.getLoadUrl();
    const data = {
      till_entry_id: tillEntryId,
      limit: count,
    };

    setIsLoading(true);
    return EntryActionCreators.load(loadUrl, data)
      .then((entriesInfo) => {
        const entries = EntriesStore.getEntries();
        setEntries((entriesInfo.items || []).concat(entries));
      })
      .always(() => setIsLoading(false));
  },

  deleteEntry(entryId) {
    const entries = EntriesStore.getEntries();
    setEntries(entries.filter((entry) => entry.entry.id !== entryId));
  },
};

export default EntriesActions;
