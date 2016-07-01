import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts, makeGetUrl } from './reqHelpers';

export const REPOST_FLOWS_REQUEST = 'REPOST_FLOWS_REQUEST';
export const REPOST_FLOWS_SUCCESS = 'REPOST_FLOWS_SUCCESS';
export const REPOST_FLOWS_FAILURE = 'REPOST_FLOWS_FAILURE';

const ITEM_LIMIT = 10;

function fetchRepostFlows(page) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(
        ApiRoutes.flowsAvailable(),
        { page, limit: ITEM_LIMIT }
      ),
      schema: Schemas.FLOW_COLL,
      types: [ REPOST_FLOWS_REQUEST, REPOST_FLOWS_SUCCESS, REPOST_FLOWS_FAILURE ],
      opts: defaultOpts,
    },
  };
}

function shouldFetchRepostFlows(state) {
  const { data: { hasMore }, isFetching } = state.repostFlows;

  return !isFetching && hasMore;
}

export function getRepostFlows(tlogId) {
  return (dispatch, getState) => {
    const state = getState();
 
    if (shouldFetchRepostFlows(state, tlogId)) {
      return dispatch(fetchRepostFlows(state.repostFlows.data.nextPage));
    }
  };
}
