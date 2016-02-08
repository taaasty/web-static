/*global $, NoticeService */
import ApiRoutes from '../../../shared/routes/api';

export const TLOG_REQUEST = 'TLOG_REQUEST';
export const TLOG_RECEIVE = 'TLOG_RECEIVE';
export const TLOG_ERROR = 'TLOG_ERROR';
export const TLOG_UPDATE = 'TLOG_UPDATE';

function tlogRequest() {
  return {
    type: TLOG_REQUEST,
  };
}

function tlogError(error) {
  return {
    type: TLOG_ERROR,
    payload: error,
  };
}

function tlogReceive(data) {
  return {
    type: TLOG_RECEIVE,
    payload: data,
  };
}

function shouldFetchTlog(state, slug) {
  return (!state.tlog.isFetching &&
          (!state.tlog.slug || state.tlog.slug !== slug));
}


function fetchTlog(slug) {
  return (dispatch) => {
    dispatch(tlogRequest());
    return $.ajax({ url: ApiRoutes.tlog(slug) })
      .done((data) => dispatch(tlogReceive({ data, slug })))
      .fail((error) => {
        NoticeService.errorResponse(error);
        return dispatch(tlogError({ error: error.responseJSON, slug }));
      });
  };
}

export function getTlog(slug) {
  return (dispatch, getState) => {
    if (slug && shouldFetchTlog(getState(), slug)) {
      return dispatch(fetchTlog(slug));
    }
  };
}
