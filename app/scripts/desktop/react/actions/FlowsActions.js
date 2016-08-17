import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { NORMALIZE_DATA } from '../middleware/normalize';
import { defaultOpts, makeGetUrl } from './reqHelpers';

export const FLOWS_REQUEST = 'FLOWS_REQUEST';
export const FLOWS_SUCCESS = 'FLOWS_SUCCESS';
export const FLOWS_FAILURE = 'FLOWS_FAILURE';

const PAGE_SIZE_LIMIT = 30;

export const navFilters = ['popular', 'newest', 'my'];
export const navFiltersUnauth = ['popular', 'newest']; // should be a subset of navFilters

export function flowsData({ query }) {
  const activeIdx = navFilters.indexOf(query && query.flows_filter);
  const filterIdx = activeIdx < 0 ? 0 : activeIdx;

  return {
    filterIdx,
    filter: navFilters[filterIdx],
  };
}

export function initFlows(data, location) {
  const { filter } = flowsData(location);

  return {
    [NORMALIZE_DATA]: {
      schema: Schemas.FLOW_COLL,
      type: FLOWS_SUCCESS,
      data,
    },
    filter,
  };
}

function fetchFlows({ filter, page }) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(
        ApiRoutes.flows(), { page, sort: filter, limit: PAGE_SIZE_LIMIT }
      ),
      schema: Schemas.FLOW_COLL,
      types: [FLOWS_REQUEST, FLOWS_SUCCESS, FLOWS_FAILURE],
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
    const { isFetching, filter, data: { hasMore, nextPage } } = getState()
      .flows;

    if (isFetching || !hasMore) {
      return null;
    }

    return dispatch(fetchFlows({ filter, page: nextPage }));
  };
}
