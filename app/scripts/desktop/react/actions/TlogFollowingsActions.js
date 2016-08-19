import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts } from './reqHelpers';

export const TLOG_FOLLOWINGS_REQUEST = 'TLOG_FOLLOWINGS_REQUEST';
export const TLOG_FOLLOWINGS_SUCCESS = 'TLOG_FOLLOWINGS_SUCCESS';
export const TLOG_FOLLOWINGS_FAILURE = 'TLOG_FOLLOWINGS_FAILURE';

function fetchTlogFollowings(endpoint, tlogId) {
  return {
    tlogId,
    [CALL_API]: {
      endpoint,
      types: [ TLOG_FOLLOWINGS_REQUEST, TLOG_FOLLOWINGS_SUCCESS, TLOG_FOLLOWINGS_FAILURE ],
      schema: Schemas.RELATIONSHIP_COLL,
      opts: defaultOpts,
    },
  };
}

function shouldFetchTlogFollowings(state, tlogId) {
  const { isFetching, tlogId: fetchedTlogId } = state.tlogFollowings;

  return !isFetching && fetchedTlogId !== tlogId;
}

export function getTlogFollowingsIfNeeded(tlogId) {
  return (dispatch, getState) => {
    if (shouldFetchTlogFollowings(getState(), tlogId)) {
      return dispatch(fetchTlogFollowings(ApiRoutes.tlog_followings(tlogId), tlogId));
    }
  };
}
