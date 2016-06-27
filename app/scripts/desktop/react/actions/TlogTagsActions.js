import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts } from './reqHelpers';

export const TLOG_TAGS_REQUEST = 'TLOG_TAGS_REQUEST';
export const TLOG_TAGS_SUCCESS = 'TLOG_TAGS_SUCCESS';
export const TLOG_TAGS_FAILURE = 'TLOG_TAGS_FAILURE';

function fetchTlogTags(endpoint, tlogId) {
  return {
    tlogId,
    [CALL_API]: {
      endpoint,
      types: [ TLOG_TAGS_REQUEST, TLOG_TAGS_SUCCESS, TLOG_TAGS_FAILURE ],
      schema: Schemas.RELATIONSHIP_COLL,
      opts: defaultOpts,
    },
  };
}

function shouldFetchTlogTags(state, tlogId) {
  const { isFetching, tlogId: fetchedTlogId } = state.tlogTags;

  return !isFetching && fetchedTlogId !== tlogId;
}

export function getTlogTagsIfNeeded(tlogId) {
  return (dispatch, getState) => {
    if (shouldFetchTlogTags(getState(), tlogId)) {
      return dispatch(fetchTlogTags(ApiRoutes.tlog_tags(tlogId), tlogId));
    }
  };
}
