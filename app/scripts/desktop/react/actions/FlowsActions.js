import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts, makeGetUrl } from './reqHelpers';

export const FLOWS_REQUEST = 'FLOWS_REQUEST';
export const FLOWS_SUCCESS = 'FLOWS_SUCCESS';
export const FLOWS_FAILURE = 'FLOWS_FAILURE';

export const FLOWS_MINE_REQUEST = 'FLOWS_MINE_REQUEST';
export const FLOWS_MINE_SUCCESS = 'FLOWS_MINE_SUCCESS';
export const FLOWS_MINE_FAILURE = 'FLOWS_MINE_FAILURE';

export const navFilters = [ 'popular', 'newest', 'my' ];
export const navFiltersUnauth = [ 'popular', 'newest' ]; // should be a subset of navFilters

const PAGE_SIZE_LIMIT = 30;

export function flowsData({ query }) {
  const activeIdx = navFilters.indexOf(query && query.flows_filter);
  const filterIdx = activeIdx < 0 ? 0 : activeIdx;

  return {
    filterIdx,
    filter: navFilters[filterIdx],
  };
}


function fetchFlows(endpoint) {
  return {
    [CALL_API]: {
      endpoint,
      schema: Schemas.FLOW_COLL,
      types: [],
      opts: defaultOpts,
    },
  };
}

function shouldFetchFlows(state, { filter }) {
  const { isFetching, filter: cFilter } = state.flows;

  return (!isFetching && filter !== cFilter);
}

function getFlows({ filter }) {
  return (dispatch) => {
    dispatch(flowsRequest());
    dispatch(flowsReset());
    return fetchFlows(ApiRoutes.flows(), { sort: filter, limit: PAGE_SIZE_LIMIT })
      .done((data) => dispatch(flowsReceive({ data, filter })))
      .fail((error) => dispatch(flowsError({ error: error.responseJSON, filter })));
  };
}

export function getFlowsIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchFlows(getState(), params)) {
      return dispatch(getFlows(params));
    }
  };
}

export function appendFlows() {
  return (dispatch, getState) => {
    const { isFetching, filter, data: { has_more, next_page } } = getState().flows;

    if (isFetching || !has_more) {
      return null;
    }

    dispatch(flowsRequest());
    return fetchFlows(ApiRoutes.flows(), { sort: filter, limit: PAGE_SIZE_LIMIT, page: next_page })
      .done((data) => {
        const prevItems = getState().flows.data.items;
        dispatch(flowsReceive({ data: { ...data, items: prevItems.concat(data.items) } }));
        return data;
      })
      .fail((error) => dispatch(flowsError({ error: error.responseJSON })));
  };
}
