import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts, makeGetUrl } from './reqHelpers';
import { REL_FRIEND_STATE } from './RelationshipActions';

export const RELS_REQUEST = 'RELS_REQUEST';
export const RELS_SUCCESS = 'RELS_SUCCESS';
export const RELS_FAILURE = 'RELS_FAILURE';
export const RELS_UNLOADED = 'RELS_UNLOADED';

export const RELS_BY_FRIEND = 'RELS_BY_FRIEND';
export const RELS_TO_IGNORED = 'RELS_TO_IGNORED';

const RELS_LIMIT = 10;

function fetchRelsByFriend(objectId, sincePosition) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(ApiRoutes.tlogRelationshipsBy(objectId, 'friend'), { limit: RELS_LIMIT, sincePosition }),
      schema: Schemas.RELATIONSHIP_COLL,
      types: [ RELS_REQUEST, RELS_SUCCESS, RELS_FAILURE ],
      opts: defaultOpts,
    },
    relType: RELS_BY_FRIEND,
  };
}

function unloadedRelsByFriend(currentRelsCount) {
  return {
    type: RELS_UNLOADED,
    currentRelsCount,
    relType: RELS_BY_FRIEND,
  };
}

function shouldFetchRelsByFriend(state) {
  return !state.get('isFetching');
}

export function getRelsByFriend(objectId) {
  return (dispatch, getState) => {
    if (shouldFetchRelsByFriend(getState().rels.get(RELS_BY_FRIEND))) {
      const getFriends = () => getState()
            .entities
            .get('rel')
            .filter((r) => r.get('userId') === objectId && r.get('state') === REL_FRIEND_STATE);
      const last = getFriends()
            .sortBy((r) => r.get('position', 100000))
            .last();
      const sincePosition = last && last.get('position');

      return dispatch(fetchRelsByFriend(objectId, sincePosition))
        .then(() => dispatch(unloadedRelsByFriend(getFriends().count())));
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
    relType: RELS_TO_IGNORED,
  };
}
