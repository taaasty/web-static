/*global $, NoticeService */
import ApiRoutes from '../../../shared/routes/api';

export const TLOG_ENTRY_REQUEST = 'TLOG_ENTRY_REQUEST';
export const TLOG_ENTRY_RECEIVE = 'TLOG_ENTRY_RECEIVE';
export const TLOG_ENTRY_ERROR = 'TLOG_ENTRY_ERROR';
export const TLOG_ENTRY_RESET = 'TLOG_ENTRY_RESET';

function tlogEntryRequest() {
  return {
    type: TLOG_ENTRY_REQUEST,
  };
}

function tlogEntryReceive({ data, id }) {
  return {
    type: TLOG_ENTRY_RECEIVE,
    payload: {
      id,
      data: { ...data, url: data.url || data.entry_url },   //FIXME inconsistent data /entries|/tlogs
    },
  };
}

function tlogEntryError(error) {
  return {
    type: TLOG_ENTRY_ERROR,
    payload: error,
  };
}

export function resetTlogEntry() {
  return {
    type: TLOG_ENTRY_RESET,
  };
}

export function setTlogEntry({ entry, commentator }) {
  return tlogEntryReceive({ data: { ...entry, commentator }, id: entry.id });
}

function shouldFetchTlogEntry(state, id) {
  return (!state.tlogEntry.isFetching &&
          (!state.tlogEntry.id || state.tlogEntry.id !== id));
}

function fetchTlogEntry(id) {
  return (dispatch) => {
    dispatch(tlogEntryRequest());
    return $.ajax({ url: ApiRoutes.entry_url(id), data: { include_comments: true } })
      .done((data) => dispatch(tlogEntryReceive({ data, id })))
      .fail((error) => {
        NoticeService.errorResponse(error);
        return dispatch(tlogEntryError({ error: error.responseJSON, id }));
      });
  };
}

export function getTlogEntry(id, force) {
  return (dispatch, getState) => {
    if (force || shouldFetchTlogEntry(getState(), id)) {
      return dispatch(fetchTlogEntry(id));
    }
  };
}
