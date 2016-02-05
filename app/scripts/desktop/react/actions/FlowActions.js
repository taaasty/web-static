/*global $, NoticeService */
import ApiRoutes from '../../../shared/routes/api';

export const FLOW_REQUEST = 'FLOW_REQUEST';
export const FLOW_RECEIVE = 'FLOW_RECEIVE';
export const FLOW_ERROR = 'FLOW_ERROR';
export const FLOW_UPDATE = 'FLOW_UPDATE';

function flowRequest() {
  return {
    type: FLOW_REQUEST,
  };
}

function flowError(error) {
  return {
    type: FLOW_ERROR,
    payload: error,
  };
}

function flowReceive(data) {
  return {
    type: FLOW_RECEIVE,
    payload: data,
  };
}

function shouldFetchFlow(state, id) {
  return (!state.flow.isFetching &&
          (!state.flow.id || state.flow.id !== id));
}

function fetchFlow(id) {
  return (dispatch) => {
    dispatch(flowRequest());
    return $.ajax({ url: ApiRoutes.flow(id) })
      .done((data) => dispatch(flowReceive({ id, data })))
      .fail((error) => {
        NoticeService.errorResponse(error);
        return dispatch(flowError({ id, error: error.responseJSON }));
      });
  };
}

export function getFlow(id) {
  return (dispatch, getState) => {
    if (id && shouldFetchFlow(getState(), id)) {
      return dispatch(fetchFlow(id));
    }
  };
}
