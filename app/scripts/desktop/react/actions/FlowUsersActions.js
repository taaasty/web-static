import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts, makeGetUrl } from './reqHelpers';

export const FLOW_USERS_REQUEST = 'FLOW_USERS_REQUEST';
export const FLOW_USERS_SUCCESS = 'FLOW_USERS_SUCCESS';
export const FLOW_USERS_FAILURE = 'FLOW_USERS_FAILURE';
export const FLOW_USERS_RESET = 'FLOW_USERS_RESET';
export const FLOW_USERS_NEXT = 'FLOW_USERS_NEXT';
export const FLOW_USERS_PREV = 'FLOW_USERS_PREV';

const FLOW_USERS_LIMIT = 10;

export function resetFlowUsers() {
  return {
    type: FLOW_USERS_RESET,
  };
}

export function selectNextFlowUser() {
  return {
    type: FLOW_USERS_NEXT,
  };
}

export function selectPrevFlowUser() {
  return {
    type: FLOW_USERS_PREV,
  };
}

function fetchFlowUsers(query, limit) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(ApiRoutes.users_predict(), { query, limit }),
      schema: Schemas.TLOG_COLL,
      types: [ FLOW_USERS_REQUEST, FLOW_USERS_SUCCESS, FLOW_USERS_FAILURE ],
      opts: defaultOpts,
    },
    query,
  };
}

function shouldFetchFlowUsers(state, query) {
  const { query: cQuery } = state.flowUsers;

  return query !== cQuery;
}

export function predictFlowUsers(query, limit=FLOW_USERS_LIMIT) {
  return (dispatch, getState) => {
    if (shouldFetchFlowUsers(getState(), query)) {
      return dispatch(fetchFlowUsers(query, limit));
    }
  };
}
