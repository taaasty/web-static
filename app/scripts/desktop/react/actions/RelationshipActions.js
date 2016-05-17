/*global setTimeout */
import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { postOpts } from './reqHelpers';

export const RELATIONSHIP_REQUEST = 'RELATIONSHIP_REQUEST';
export const RELATIONSHIP_SUCCESS = 'RELATIONSHIP_SUCCESS';
export const RELATIONSHIP_FAILURE = 'RELATIONSHIP_FAILURE';
export const RELATIONSHIP_RESET_ERROR = 'RELATIONSHIP_RESET_ERROR';

const RESET_ERROR_TIMEOUT = 1000;

function changeMyRelationship(id, relId, action) {
  return (dispatch) => {
    return dispatch({
      [CALL_API]: {
        endpoint: ApiRoutes.change_my_relationship_url(id, action),
        schema: Schemas.RELATIONSHIP,
        types: [ RELATIONSHIP_REQUEST, RELATIONSHIP_SUCCESS, RELATIONSHIP_FAILURE ],
        opts: postOpts(),
      },
      relId,
    })
      .fail(() => setTimeout(
        () => dispatch({ type: RELATIONSHIP_RESET_ERROR, relId }),
        RESET_ERROR_TIMEOUT
      ));
  };
}

export function follow(id, relId) {
  return changeMyRelationship(id, relId, 'follow');
}

export function unfollow(id, relId) {
  return changeMyRelationship(id, relId, 'unfollow');
}

export function cancel(id, relId) {
  return changeMyRelationship(id, relId, 'cancel');
}
