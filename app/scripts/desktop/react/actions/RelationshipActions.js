/*global $, NoticeService */
import ApiRoutes from '../../../shared/routes/api';

export const RELATIONSHIP_REQUEST = 'RELATIONSHIP_REQUEST';
export const RELATIONSHIP_ERROR = 'RELATIONSHIP_ERROR';
export const RELATIONSHIP_UPDATE = 'RELATIONSHIP_UPDATE';
export 

function relationshipUpdate(id, data) {
  return {
    type: RELATIONSHIP_UPDATE,
    payload: { id, data },
  };
}

function relationshipRequest(id) {
  return {
    type: RELATIONSHIP_REQUEST,
    payload: id,
  };
}

function relationshipError(id, error) {
  return {
    type: RELATIONSHIP_ERROR,
    payload: { id, error },
  };
}

function changeMyRelationship(id, action) {
  return (dispatch) => {
    dispatch(relationshipRequest(id));
    return $.ajax({
      url: ApiRoutes.change_my_relationship_url(id, action),
      method: 'POST',
    })
      .done((data) => dispatch(relationshipUpdate(id, data)))
      .fail((error) => {
        NoticeService.errorResponse(error);
        dispatch(relationshipError(id, error.responseJSON || error.statusText));
      });
  };
}

export function resetError(id) {
  return (dispatch) => dispatch(relationshipError(id, null));
}

export function follow(id) {
  return (dispatch) => dispatch(changeMyRelationship(id, 'follow'));
}

export function unfollow(id) {
  return (dispatch) => dispatch(changeMyRelationship(id, 'unfollow'));
}

export function cancel(id) {
  return (dispatch) => dispatch(changeMyRelationship(id, 'cancel'));
}
