import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts, makeGetUrl } from './reqHelpers';
import { OrderedSet } from 'immutable';

export const RELS_REQUEST = 'RELS_REQUEST';
export const RELS_SUCCESS = 'RELS_SUCCESS';
export const RELS_FAILURE = 'RELS_FAILURE';

export const RELS_BY_FRIEND = 'RELS_BY_FRIEND';
export const RELS_TO_IGNORED = 'RELS_TO_IGNORED';

function fetchRelsByFriend(signature, objectId, sincePosition) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(ApiRoutes.tlogRelationshipsBy(objectId, 'friend'), { sincePosition }),
      schema: Schemas.RELATIONSHIP_COLL,
      types: [ RELS_REQUEST, RELS_SUCCESS, RELS_FAILURE ],
      opts: defaultOpts,
    },
    type: RELS_BY_FRIEND,
    signature,
  };
}

function shouldFetchRelsByFriend(state, signature) {
  const isFetching = state.get('isFetching');

  return !isFetching;
}

export function getRelsByFriend(objectId) {
  const signature = String(objectId);

  return (dispatch, getState) => {
    if (shouldFetchRelsByFriend(getState().rels.get(RELS_BY_FRIEND), signature)) {
      const sincePosition = getState().rels
            .getIn([ RELS_BY_FRIEND, 'relationships' ], OrderedSet())
            .last()
            .get('id');

      return dispatch(fetchRelsByFriend(signature, objectId, sincePosition));
    }
  };
}

function fetchRelsToIgnored(objectId, sincePosition) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(ApiRoutes.tlogRelationshipsTo(objectId, 'ignored'), { sincePosition }),
      schema: Schemas.RELATIONSHIP_COLL,
      types: [ RELS_REQUEST, RELS_SUCCESS, RELS_FAILURE ],
      opts: defaultOpts,
    },
    type: RELS_TO_IGNORED,
    signature: objectId,
  };
}
