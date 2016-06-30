import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts, makeGetUrl } from './reqHelpers';

export const REPOST_FLOWS_REQUEST = 'REPOST_FLOWS_REQUEST';
export const REPOST_FLOWS_SUCCESS = 'REPOST_FLOWS_SUCCESS';
export const REPOST_FLOWS_FAILURE = 'REPOST_FLOWS_FAILURE';

function fetchRepostFlows(page) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(ApiRoutes.flowsAvailable(), { page }),
      schema: Schemas.FLOW_COLL,
      types: [ REPOST_FLOWS_REQUEST, REPOST_FLOWS_SUCCESS, REPOST_FLOWS_FAILURE ],
      opts: defaultOpts,
    },
  };
}

function shouldFetchRepostFlows(state) {
  const { data: { hasMore, nextPage }, isFetching } = state.repostFlows;

  return !isFetching && hasMore;
}

export function getRepostFlows(tlogId) {
  return (dispatch, getState) => {
    if (shouldFetchRepostFlows(getState(), tlogId)) {
      return dispatch(fetchRepostFlows());
    }
  };
}
