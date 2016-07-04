import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts, makeGetUrl } from './reqHelpers';

export const FLOWS_REQUEST = 'FLOWS_REQUEST';
export const FLOWS_SUCCESS = 'FLOWS_SUCCESS';
export const FLOWS_FAILURE = 'FLOWS_FAILURE';

const PAGE_SIZE_LIMIT = 30;

function fetchFlows({ filter, page }) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(
        ApiRoutes.flows(),
        { page, sort: filter, limit: PAGE_SIZE_LIMIT }
      ),
      schema: Schemas.FLOW_COLL,
      types: [ FLOWS_REQUEST, FLOWS_SUCCESS, FLOWS_FAILURE ],
      opts: defaultOpts,
    },
    filter,
  };
}

function shouldFetchFlows(state, { filter }) {
  const { isFetching, filter: cFilter } = state.flows;

  return (!isFetching && filter !== cFilter);
}

export function getFlowsIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchFlows(getState(), params)) {
      return dispatch(fetchFlows(params));
    }
  };
}

export function appendFlows() {
  return (dispatch, getState) => {
    const { isFetching, filter, data: { hasMore, nextPage } } = getState().flows;

    if (isFetching || !hasMore) {
      return null;
    }

    return dispatch(fetchFlows({ filter, page: nextPage }));
  };
}
