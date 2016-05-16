import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { postOpts } from './reqHelpers';

export const RELATIONSHIP_REQUEST = 'RELATIONSHIP_REQUEST';
export const RELATIONSHIP_SUCCESS = 'RELATIONSHIP_SUCCESS';
export const RELATIONSHIP_FAILURE = 'RELATIONSHIP_FAILURE';

function changeMyRelationship(id, relId, action) {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.change_my_relationship_url(id, action),
      schema: Schemas.RELATIONSHIP,
      types: [ RELATIONSHIP_REQUEST, RELATIONSHIP_SUCCESS, RELATIONSHIP_FAILURE ],
      opts: postOpts(),
    },
    relId,
  };
}

export function resetError(id) {
//          .fail(() => window.setTimeout(() => resetError(subjectId), 1000));
  return (dispatch) => dispatch(relationshipError(id, null));
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
