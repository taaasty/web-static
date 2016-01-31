/*global $, NoticeService */
import ApiRoutes from '../../../shared/routes/api';

export const TLOG_ENTRY_REQUEST = 'TLOG_ENTRY_REQUEST';
export const TLOG_ENTRY_RECEIVE = 'TLOG_ENTRY_RECEIVE';
export const TLOG_ENTRY_ERROR = 'TLOG_ENTRY_ERROR';

function tlogEntryRequest() {
  return {
    type: TLOG_ENTRY_REQUEST,
  };
}

function tlogEntryReceive(data) {
  return {
    type: TLOG_ENTRY_RECEIVE,
    payload: { ...data, url: data.url || data.entry_url },   //FIXME inconsistent data /entries|/tlogs
  };
}

function tlogEntryError(error) {
  return {
    type: TLOG_ENTRY_ERROR,
    payload: error,
  };
}

export function setTlogEntry(data) {
  return tlogEntryReceive(data);
}

function shouldFetchTlogEntry(state, id) {
  return (!state.tlogEntry.isFetching &&
          (!state.tlogEntry.data.id || state.tlogEntry.data.id !== id));
}

function fetchTlogEntry(id) {
  return (dispatch) => {
    dispatch(tlogEntryRequest());
    return $.ajax({ url: ApiRoutes.entry_url(id), data: { include_comments: true } })
      .done((data) => dispatch(tlogEntryReceive(data)))
      .fail((err) => {
        NoticeService.errorResponse(err);
        return dispatch(tlogEntryError(err));
      });
  };
}

export function getTlogEntry(id) {
  return (dispatch, getState) => {
    if (shouldFetchTlogEntry(getState(), id)) {
      return dispatch(fetchTlogEntry(id));
    }
  }
}
