/*global $, NoticeService, ErrorService */
import ApiRoutes from '../../../shared/routes/api';
import ApiHelpers from '../../../shared/helpers/api';

export const FLOW_REQUEST = 'FLOW_REQUEST';
export const FLOW_RECEIVE = 'FLOW_RECEIVE';
export const FLOW_ERROR = 'FLOW_ERROR';
export const FLOW_UPDATE = 'FLOW_UPDATE';
export const FLOW_STAFF_ADD = 'FLOW_STAFF_ADD';
export const FLOW_STAFF_REMOVE = 'FLOW_STAFF_REMOVE';
export const FLOW_STAFF_ROLE = 'FLOW_STAFF_ROLE';

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

export function flowReceive(data) {
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

export function update({ name, slug, title, picFile, is_privacy, is_premoderate }) {
  const formData = ApiHelpers.prepareFormData({
    name, slug, title, is_privacy, is_premoderate, flowpic: picFile,
  });

  return (dispatch, getState) => {
    const id = getState().flow.id;

    dispatch(flowRequest());
    return $.ajax({
      url: ApiRoutes.flow(id),
      processData: false,
      contentType: false,
      data: (formData.append('_method', 'PUT'), formData),
      method: 'POST',
    })
      .done((data) => {
        dispatch(flowReceive({ data }));
        NoticeService.notifySuccess('Поток успешно обновлён');
        return data;
      })
      .fail((error) => {
        dispatch(flowError({ error: error.responseJSON }));
        NoticeService.errorResponse(error);
        ErrorService.notifyErrorResponse('Изменение потока', {
          method: 'FlowActionCreators.update(flowID, {name, slug, title, picFile, is_privacy, is_premoderate})',
          methodArguments: { id, name, slug, title, picFile, is_privacy, is_premoderate },
          response: error.responseJSON,
        });
      });
  };
}

export function addStaff(userId) {
  return (dispatch, getState) => {
    const id = getState().flow.id;

    dispatch(flowRequest());
    return $.ajax({ url: ApiRoutes.flowStaffs(id), data: { user_id: userId }, method: 'POST' })
      .done((staff) => dispatch({ type: FLOW_STAFF_ADD, payload: staff }))
      .fail((error) => {
        dispatch(flowError({ error: error.responseJSON }));
        NoticeService.errorResponse(error);
        ErrorService.notifyErrorResponse('Добавление модератора потока', {
          method: 'FlowActions.addStaff(userId)',
          methodArguments: {id, userId},
          response: error.responseJSON,
        });
      });
  };
}

export function removeStaff(userId) {
  return (dispatch, getState) => {
    const id = getState().flow.id;

    dispatch(flowRequest());
    return $.ajax({ url: ApiRoutes.flowStaffs(id), data: { user_id: userId, _method: 'DELETE' }, method: 'POST' })
      .done((staff) => dispatch({ type: FLOW_STAFF_REMOVE, payload: staff }))
      .fail((error) => {
        dispatch(flowError({ error: error.responseJSON }));
        NoticeService.errorResponse(error);
        ErrorService.notifyErrorResponse('Удаление модератора потока', {
          method: 'FlowActions.removeStaff(userId)',
          methodArguments: {id, userId},
          response: error.responseJSON,
        });
      });
  };
}

export function changeStaffRole(userId, role) {
  return (dispatch, getState) => {
    const id = getState().flow.id;

    dispatch(flowRequest());
    return $.ajax({ url: ApiRoutes.flowStaffs(id), data: { user_id: userId, role, _method: 'PUT' }, method: 'POST' })
      .done((staff) => dispatch({ type: FLOW_STAFF_ROLE, payload: { staff, role } }))
      .fail((error) => {
        dispatch(flowError({ error: error.responseJSON }));
        NoticeService.errorResponse(error);
        ErrorService.notifyErrorResponse('Изменение роли модератора', {
          method: 'FlowActionCreators.removeStaff(userId, role)',
          methodArguments: {userId, role},
          response: error.responseJSON,
        });
      });
  };
}
