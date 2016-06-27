import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts } from './reqHelpers';

export const TLOG_FOLLOWERS_REQUEST = 'TLOG_FOLLOWERS_REQUEST';
export const TLOG_FOLLOWERS_SUCCESS = 'TLOG_FOLLOWERS_SUCCESS';
export const TLOG_FOLLOWERS_FAILURE = 'TLOG_FOLLOWERS_FAILURE';

function fetchTlogFollowers(endpoint, tlogId) {
  return {
    tlogId,
    [CALL_API]: {
      endpoint,
      types: [ TLOG_FOLLOWERS_REQUEST, TLOG_FOLLOWERS_SUCCESS, TLOG_FOLLOWERS_FAILURE ],
      schema: Schemas.RELATIONSHIP_COLL,
      opts: defaultOpts,
    },
  };
}

function shouldFetchTlogFollowers(state, tlogId) {
  const { isFetching, tlogId: fetchedTlogId } = state.tlogFollowers;

  return !isFetching && fetchedTlogId !== tlogId;
}

export function getTlogFollowersIfNeeded(tlogId) {
  return (dispatch, getState) => {
    if (shouldFetchTlogFollowers(getState(), tlogId)) {
      return dispatch(fetchTlogFollowers(ApiRoutes.tlog_followers(tlogId), tlogId));
    }
  };
}
