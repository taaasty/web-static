/*global $, NoticeService */
import ApiRoutes from '../../../shared/routes/api';
export const CALENDAR_REQUEST = 'CALENDAR_REQUEST';
export const CALENDAR_RECEIVE = 'CALENDAR_RECEIVE';
export const CALENDAR_ERROR = 'CALENDAR_ERROR';

function requestCalendar() {
  return {
    type: CALENDAR_REQUEST,
  };
}

function errorCalendar(error) {
  return {
    type: CALENDAR_ERROR,
    payload: error,
  };
}

function receiveCalendar(calendar) {
  return {
    type: CALENDAR_RECEIVE,
    payload: calendar,
  };
}

function fetchCalendar(tlogId) {
  return (dispatch) => {
    dispatch(requestCalendar());
    return $.ajax({ url: ApiRoutes.calendar_url(tlogId) })
      .done((data) => dispatch(receiveCalendar(data)))
      .fail((err) => {
        NoticeService.errorResponse(err);
        return dispatch(errorCalendar(err));
      });
  };
}

function shouldFetchCalendar(state, tlogId) {
  return state.calendar.periods.length === 0 ||
    tlogId !== state.calendar.tlog_id;
}

export function getCalendar(tlogId, force) {
  return (dispatch, getState) => {
    if (force || shouldFetchCalendar(getState(), tlogId)) {
      return dispatch(fetchCalendar(tlogId));
    }
  };
}
