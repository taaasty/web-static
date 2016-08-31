import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { makeGetUrl, defaultOpts } from './reqHelpers';

export const TLOG_ENTRY_REQUEST = 'TLOG_ENTRY_REQUEST';
export const TLOG_ENTRY_SUCCESS = 'TLOG_ENTRY_SUCCESS';
export const TLOG_ENTRY_FAILURE = 'TLOG_ENTRY_FAILURE';

function fetchTlogEntry(id) {
  const endpoint = makeGetUrl(ApiRoutes.entry_url(id), {
    includeComments: true,
    includeTruncated: true,
  });

  return {
    [CALL_API]: {
      endpoint,
      schema: Schemas.ENTRY,
      types: [TLOG_ENTRY_REQUEST, TLOG_ENTRY_SUCCESS, TLOG_ENTRY_FAILURE],
      opts: defaultOpts,
    },
    entryId: id,
  };
}

export function getTlogEntry(id, force, requiredFields = []) {
  return (dispatch, getState) => {
    const { entities, entryState } = getState();
    const { isFetching } = entryState[id] || {};
    const entry = entities.getIn(['entry', id.toString()]);

    if (!force && entry && requiredFields.every((key) => entry.has(key))) {
      return null;
    }

    if (!isFetching) {
      return dispatch(fetchTlogEntry(id));
    }
  };
}
