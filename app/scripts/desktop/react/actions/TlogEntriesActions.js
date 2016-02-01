import Api from '../api/api';
import ApiRoutes from '../../../shared/routes/api';
import ErrorService from '../../../shared/react/services/Error';
import { TLOG_SECTION_TLOG } from '../../../shared/constants/Tlog';

export const TLOG_ENTRIES_REQUEST = 'ENTRIES_REQUEST';
export const TLOG_ENTRIES_RECEIVE = 'ENTRIES_RECEIVE';
export const TLOG_ENTRIES_RESET = 'ENTRIES_RESET';
export const TLOG_ENTRIES_DELETE_ENTRY = 'ENTRIES_DELETE_ENTRY';
export const TLOG_ENTRIES_ERROR = 'ENTRIES_ERROR';

function tlogEntriesReceive(data) {
  return {
    type: TLOG_ENTRIES_RECEIVE,
    payload: data,
  };
}

function tlogEntriesRequest() {
  return {
    type: TLOG_ENTRIES_REQUEST,
  };
}

function tlogEntriesReset() {
  return {
    type: TLOG_ENTRIES_RESET,
  };
}

function tlogEntriesError(error) {
  return {
    type: TLOG_ENTRIES_ERROR,
    payload: error,
  };
}

function fetchTlogEntries(url, data) {
  return Api.entry.load(url,data)
    .fail((xhr) => {
      ErrorService.notifyErrorResponse('Загрузка записей', {
        method: 'EntryActionCreators.load(url, data)',
        methodArguments: {url, data},
        response: xhr.responseJSON,
      });
    });
}

function shouldFetchTlogEntries(state, slug, section, date='', type='tlogs') {
  const { data, isFetching, date: cDate, section: cSection, slug: cSlug, type: cType } = state.tlogEntries;

  return !isFetching && (data.items.length === 0 || slug !== cSlug || date !== cDate ||
                         section !== cSection || type !== cType);
}

function getTlogEntries(slug, section, date, type) {
  return (dispatch) => {
    const url = ApiRoutes.tlogEntries(slug, section, type);

    dispatch(tlogEntriesRequest());
    dispatch(tlogEntriesReset());
    return fetchTlogEntries(url, { date })
      .then((data) => dispatch(tlogEntriesReceive({ data, date, section, slug, type })))
      .fail((err) => dispatch(tlogEntriesError(err)));
  };
}

export function getTlogEntriesIfNeeded(slug, section=TLOG_SECTION_TLOG, date='', type='tlogs') {
  return (dispatch, getState) => {
    if (shouldFetchTlogEntries(getState(), slug, section, date, type)) {
      return dispatch(getTlogEntries(slug, section, date, type));
    }
  };
}

export function appendTlogEntries() {
  return (dispatch, getState) => {
    const { section, slug, type, data: { next_since_entry_id } } = getState().tlogEntries;
    const url = ApiRoutes.tlogEntries(slug, section, type);
    const params = { since_entry_id: next_since_entry_id };

    dispatch(tlogEntriesRequest());
    return fetchTlogEntries(url, params)
      .then((data) => {
        const prevItems = getState().tlogEntries.data.items;
        dispatch(tlogEntriesReceive({ data: { ...data, items: prevItems.concat(data.items) } }));
        return data;
      })
      .fail((err) => dispatch(tlogEntriesError(err)));
  };
}

export function prependTlogEntries(tillEntryId, count) {
  return (dispatch, getState) => {
    const { section, slug, type } = getState().tlogEntries;
    const url = ApiRoutes.tlogEntries(slug, section, type);
    const params = { till_entry_id: tillEntryId, limit: count };

    dispatch(tlogEntriesRequest());
    return fetchTlogEntries(url, params)
      .then((data) => {
        const prevItems = getState().tlogEntries.data.items;
        dispatch(tlogEntriesReceive({ data: { ...data, items: data.items.concat(prevItems) } }));
        return data;
      })
      .fail((err) => dispatch(tlogEntriesError(err)));
  };
}

export function deleteEntry(entryId) {
  return {
    type: TLOG_ENTRIES_DELETE_ENTRY,
    payload: entryId,
  };
}
