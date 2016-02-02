/*global $, NoticeService */
import ApiRoutes from '../../../shared/routes/api';

export const TLOG_REQUEST = 'TLOG_REQUEST';
export const TLOG_RECEIVE = 'TLOG_RECEIVE';
export const TLOG_ERROR = 'TLOG_ERROR';

function tlogRequest() {
  return {
    type: TLOG_REQUEST,
  };
}

function tlogError(error) {
  return {
    type: TLOG_ERROR,
    payload: error,
  }
}

function tlogReceive(tlog) {
  return {
    type: TLOG_RECEIVE,
    payload: tlog,
  };
}

function shouldFetchTlog(state, slug) {
  return (!state.tlog.isFetching &&
          (!state.tlog.data.slug || state.tlog.data.slug !== slug));
}


function fetchTlog(slug) {
  return (dispatch) => {
    dispatch(tlogRequest());
    return $.ajax({ url: ApiRoutes.tlog(slug) })
      .done((data) => dispatch(tlogReceive(data)))
      .fail((err) => {
        NoticeService.errorResponse(err);
        return dispatch(tlogError(err));
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
