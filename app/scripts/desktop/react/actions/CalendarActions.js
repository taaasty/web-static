import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { auth } from './CurrentUserActions';

export const CALENDAR_REQUEST = 'CALENDAR_REQUEST';
export const CALENDAR_SUCCESS = 'CALENDAR_SUCCESS';
export const CALENDAR_FAILURE = 'CALENDAR_FAILURE';
export const CALENDAR_RESET = 'CALENDAR_RESET';

function fetchCalendar(tlogId) {
  const endpoint = ApiRoutes.calendar_url(tlogId);

  return {
    [CALL_API]: {
      endpoint,
      schema: Schemas.CALENDAR,
      types: [ CALENDAR_REQUEST, CALENDAR_SUCCESS, CALENDAR_FAILURE ],
      opts: auth,
    },
  };
}

function shouldFetchCalendar(state, tlogId) {
  return (!state.calendar.isFetching && tlogId !== state.calendar.data);
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
