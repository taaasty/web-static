import Api from '../api/api';
import ApiRoutes from '../../../shared/routes/api';
import ErrorService from '../../../shared/react/services/Error';
import { TLOG_SECTION_TLOG } from '../../../shared/constants/Tlog';

export const TLOG_ENTRIES_REQUEST = 'ENTRIES_REQUEST';
export const TLOG_ENTRIES_RECEIVE = 'ENTRIES_RECEIVE';
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

      throw xhr;
    });
}

export function getTlogEntries(section=TLOG_SECTION_TLOG, type='tlogs') {
  return (dispatch, getState) => {
    const url = ApiRoutes.tlogEntries(getState().tlog.author.id, section, type);

    dispatch(tlogEntriesRequest());
    return fetchTlogEntries(url)
      .then((data) => dispatch(tlogEntriesReceive(data)))
      .fail((err) => dispatch(tlogEntriesError(err)));
  };
}

export function appendTlogEntries(section=TLOG_SECTION_TLOG, type='tlogs') {
  return (dispatch, getState) => {
    const url = ApiRoutes.tlogEntries(getState().tlog.author.id, section, type);
    const params = { since_entry_id: getState().tlogEntries.next_since_entry_id };

    dispatch(tlogEntriesRequest());
    return fetchTlogEntries(url, params)
      .then((data) => {
        const prevItems = getState().tlogEntries.items;
        dispatch(tlogEntriesReceive({ ...data, items: prevItems.concat(data.items) }));
        return data;
      })
      .fail((err) => dispatch(tlogEntriesError(err)));
  };
}

export function prependTlogEntries(section=TLOG_SECTION_TLOG, type='tlogs', tillEntryId, count) {
  return (dispatch, getState) => {
    const url = ApiRoutes.tlogEntries(getState().tlog.author.id, section, type);
    const params = { till_entry_id: tillEntryId, limit: count };

    dispatch(tlogEntriesRequest());
    return fetchTlogEntries(url, params)
      .then((data) => {
        const prevItems = getState().tlogEntries.items;
        dispatch(tlogEntriesReceive({ ...data, items: data.items.concat(prevItems) }));
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
