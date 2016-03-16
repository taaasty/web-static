/*global $ */
import ApiRoutes from '../../../shared/routes/api';
import ErrorService from '../../../shared/react/services/Error';

export const FLOWS_REQUEST = 'FLOWS_REQUEST';
export const FLOWS_RECEIVE = 'FLOWS_RECEIVE';
export const FLOWS_ERROR = 'FLOWS_ERROR';
export const FLOWS_RESET = 'FLOWS_RESET';

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


function flowsRequest() {
  return {
    type: FLOWS_REQUEST,
  };
}

function flowsReceive(data) {
  return {
    type: FLOWS_RECEIVE,
    payload: data,
  };
}

function flowsError(error) {
  return {
    type: FLOWS_ERROR,
    payload: error,
  };
}

function flowsReset() {
  return {
    type: FLOWS_RESET,
  };
}

function fetchFlows(url, data) {
  return $.ajax({ url, data })
    .fail((xhr) => ErrorService.notifyErrorResponse('Загрузка списка потоков', {
      method: 'fetchFlows(url, data)',
      methodArguments: { url, data },
      response: xhr.responseJSON,
    }));
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
