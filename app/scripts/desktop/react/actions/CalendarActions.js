/*global $, NoticeService */
import ApiRoutes from '../../../shared/routes/api';
export const CALENDAR_REQUEST = 'CALENDAR_REQUEST';
export const CALENDAR_RECEIVE = 'CALENDAR_RECEIVE';
export const CALENDAR_ERROR = 'CALENDAR_ERROR';
export const CALENDAR_RESET = 'CALENDAR_RESET';

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
      .done((data) => dispatch(receiveCalendar({ data, tlogId })))
      .fail((error) => {
        NoticeService.errorResponse(error);
        return dispatch(errorCalendar({ error: error.respanseJSON, tlogId }));
      });
  };
}

function shouldFetchCalendar(state, tlogId) {
  return (!state.calendar.isFetching &&
          tlogId !== state.calendar.tlogId);
}

export function getCalendar(tlogId, force) {
  return (dispatch, getState) => {
    if (tlogId && (force || shouldFetchCalendar(getState(), tlogId))) {
      return dispatch(fetchCalendar(tlogId));
    }
  };
}

export function resetCalendar() {
  return {
    type: CALENDAR_RESET,
  };
}
