import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { auth } from './CurrentUserActions';
import { makeReqUrl } from './helpers';

export const TLOG_ENTRY_REQUEST = 'TLOG_ENTRY_REQUEST';
export const TLOG_ENTRY_SUCCESS = 'TLOG_ENTRY_SUCCESS';
export const TLOG_ENTRY_FAILURE = 'TLOG_ENTRY_FAILURE';

function fetchTlogEntry(id) {
  const endpoint = makeReqUrl(ApiRoutes.entry_url(id), { include_comments: true });

  return {
    [CALL_API]: {
      endpoint,
      schema: Schemas.ENTRY,
      types: [ TLOG_ENTRY_REQUEST, TLOG_ENTRY_SUCCESS, TLOG_ENTRY_FAILURE ],
      opts: auth,
    },
  };
}

export function getTlogEntry(id, force, requiredFields=[]) {
  return (dispatch, getState) => {
    const { entities: { entry: entryColl }, tlogEntry: { isFetching } } = getState();
    const entry = entryColl[id];

    if (!force && entry && requiredFields.every((key) => entry.hasOwnProperty(key))) {
      return null;
    }

    if (!isFetching) {
      return dispatch(fetchTlogEntry(id));
    }
  };
}
