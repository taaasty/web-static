import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts } from './reqHelpers';

export const FOLLOWERS_REQUEST = 'FOLLOWERS_REQUEST';
export const FOLLOWERS_SUCCESS = 'FOLLOWERS_SUCCESS';
export const FOLLOWERS_FAILURE = 'FOLLOWERS_FAILURE';

function fetchFollowers(endpoint, tlogId) {
  return {
    tlogId,
    [CALL_API]: {
      endpoint,
      types: [ FOLLOWERS_REQUEST, FOLLOWERS_SUCCESS, FOLLOWERS_FAILURE ],
      schema: Schemas.RELATIONSHIP_COLL,
      opts: defaultOpts,
    },
  };
}

function shouldFetchFollowers(state, tlogId) {
  const { isFetching, tlogId: fetchedTlogId } = state.followers;

  return !isFetching && fetchedTlogId !== tlogId;
}

export function getFollowersIfNeeded(tlogId) {
  return (dispatch, getState) => {
    if (shouldFetchFollowers(getState(), tlogId)) {
      return dispatch(fetchFollowers(ApiRoutes.tlog_followers(tlogId), tlogId));
    }
  };
}
