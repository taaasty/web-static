import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts } from './reqHelpers';

export const CALENDAR_REQUEST = 'CALENDAR_REQUEST';
export const CALENDAR_SUCCESS = 'CALENDAR_SUCCESS';
export const CALENDAR_FAILURE = 'CALENDAR_FAILURE';

function fetchCalendar(tlogId) {
  const endpoint = ApiRoutes.calendar_url(tlogId);

  return {
    [CALL_API]: {
      endpoint,
      schema: Schemas.CALENDAR,
      types: [ CALENDAR_REQUEST, CALENDAR_SUCCESS, CALENDAR_FAILURE ],
      opts: defaultOpts,
    },
  };
}

export function getCalendar(tlogId, force, requiredFields=[]) {
  return (dispatch, getState) => {
    const { entities, calendar: { isFetching } } = getState();
    const calendar = entities.getIn([ 'calendar', tlogId.toString() ]);

    if (!force && calendar && requiredFields.every((key) => calendar.has(key))) {
      return null;
    }

    return !isFetching && dispatch(fetchCalendar(tlogId));
  };
}
