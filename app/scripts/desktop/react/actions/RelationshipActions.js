/*global setTimeout */
import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { deleteOpts, postOpts } from './reqHelpers';

export const REL_FRIEND_STATE = 'friend';
export const REL_REQUESTED_STATE = 'requested';
export const REL_IGNORED_STATE = 'ignored';
export const REL_GUESSED_STATE = 'guessed';
export const REL_NONE_STATE = 'none';

export const RELATION_UNFOLLOW = 'unfollow';
export const RELATION_FOLLOW = 'follow';
export const RELATION_CANCEL = 'cancel';

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
      action,
    })
      .catch(() => setTimeout(
        () => dispatch({ type: RELATIONSHIP_RESET_ERROR, relId }),
        RESET_ERROR_TIMEOUT
      ));
  };
}

export function follow(id, relId) {
  return changeMyRelationship(id, relId, RELATION_FOLLOW);
}

export function unfollow(id, relId) {
  return changeMyRelationship(id, relId, RELATION_UNFOLLOW);
}

export function cancel(id, relId) {
  return changeMyRelationship(id, relId, RELATION_CANCEL);
}

export function unfollowFrom(objectId, subjectId, relId) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.tlogRelationshipsByTlog(objectId, subjectId),
      schema: Schemas.RELATIONSHIP,
      types: [ RELATIONSHIP_REQUEST, RELATIONSHIP_SUCCESS, RELATIONSHIP_FAILURE ],
      opts: deleteOpts(),
    },
    relId,
  };
}
