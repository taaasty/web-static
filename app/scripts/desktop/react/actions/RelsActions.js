import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts, makeGetUrl } from './reqHelpers';
import {
  REL_FRIEND_STATE,
  REL_IGNORED_STATE,
  REL_REQUESTED_STATE,
} from './RelationshipActions';

export const RELS_REQUEST = 'RELS_REQUEST';
export const RELS_SUCCESS = 'RELS_SUCCESS';
export const RELS_FAILURE = 'RELS_FAILURE';
export const RELS_UNLOADED = 'RELS_UNLOADED';

export const RELS_BY_FRIEND = 'RELS_BY_FRIEND';
export const RELS_TO_FRIEND = 'RELS_TO_FRIEND';
export const RELS_BY_REQUESTED = 'RELS_BY_REQUESTED';
export const RELS_TO_IGNORED = 'RELS_TO_IGNORED';

const RELS_LIMIT = 20;

function unloadedRels(relType, currentRelsCount) {
  return {
    type: RELS_UNLOADED,
    relType,
    currentRelsCount,
  };
}

function shouldFetchRels(state) {
  return !state.get('isFetching');
}

function fetchRelsByFriend(objectId, sincePosition) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(ApiRoutes.tlogRelationshipsBy(objectId, REL_FRIEND_STATE), { limit: RELS_LIMIT, sincePosition }),
      schema: Schemas.RELATIONSHIP_COLL,
      types: [ RELS_REQUEST, RELS_SUCCESS, RELS_FAILURE ],
      opts: defaultOpts,
    },
    relType: RELS_BY_FRIEND,
  };
}

export function getRelsByFriend(objectId) {
  return (dispatch, getState) => {
    if (shouldFetchRels(getState().rels.get(RELS_BY_FRIEND))) {
      const getFriends = () => getState()
            .entities
            .get('rel')
            .filter((r) => r.get('userId') === objectId && r.get('state') === REL_FRIEND_STATE);
      const last = getFriends()
            .sortBy((r) => r.get('position', 100000))
            .last();
      const sincePosition = last && last.get('position');

      return dispatch(fetchRelsByFriend(objectId, sincePosition))
        .then(() => dispatch(unloadedRels(getFriends().count(), RELS_BY_FRIEND)));
    }
  };
}

function fetchRelsToFriend(subjectId, sincePosition) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(ApiRoutes.tlogRelationshipsTo(subjectId, REL_FRIEND_STATE), { limit: RELS_LIMIT, sincePosition }),
      schema: Schemas.RELATIONSHIP_COLL,
      types: [ RELS_REQUEST, RELS_SUCCESS, RELS_FAILURE ],
      opts: defaultOpts,
    },
    relType: RELS_TO_FRIEND,
  };
}

export function getRelsToFriend(subjectId) {
  return (dispatch, getState) => {
    if (shouldFetchRels(getState().rels.get(RELS_TO_FRIEND))) {
      const getFollowings = () => getState()
            .entities
            .get('rel')
            .filter((r) => r.get('readerId') === subjectId && r.get('state') === REL_FRIEND_STATE);
      const last = getFollowings()
            .sortBy((r) => r.get('position', 100000))
            .last();
      const sincePosition = last && last.get('id');

      return dispatch(fetchRelsToFriend(subjectId, sincePosition))
        .then(() => dispatch(unloadedRels(getFollowings().count(), RELS_TO_FRIEND)));
    }
  };
}

function fetchRelsToIgnored(subjectId, sincePosition) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(ApiRoutes.tlogRelationshipsTo(subjectId, REL_IGNORED_STATE), { limit: RELS_LIMIT, sincePosition }),
      schema: Schemas.RELATIONSHIP_COLL,
      types: [ RELS_REQUEST, RELS_SUCCESS, RELS_FAILURE ],
      opts: defaultOpts,
    },
    relType: RELS_TO_IGNORED,
  };
}

export function getRelsToIgnored(subjectId) {
  return (dispatch, getState) => {
    if (shouldFetchRels(getState().rels.get(RELS_TO_IGNORED))) {
      const getIgnored = () => getState()
            .entities
            .get('rel')
            .filter((r) => r.get('readerId') === subjectId && r.get('state') === REL_IGNORED_STATE);
      const last = getIgnored()
            .sortBy((r) => r.get('position', 100000))
            .last();
      const sincePosition = last && last.get('position');

      return dispatch(fetchRelsToIgnored(subjectId, sincePosition))
        .then(() => dispatch(unloadedRels(getIgnored().count(), RELS_TO_IGNORED)));
    }
  };
}

function fetchRelsByRequested(objectId, sincePosition) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(ApiRoutes.tlogRelationshipsBy(objectId, REL_REQUESTED_STATE), { limit: RELS_LIMIT, sincePosition }),
      schema: Schemas.RELATIONSHIP_COLL,
      types: [ RELS_REQUEST, RELS_SUCCESS, RELS_FAILURE ],
      opts: defaultOpts,
    },
    relType: RELS_BY_REQUESTED,
  };
}

export function getRelsByRequested(objectId) {
  return (dispatch, getState) => {
    if (shouldFetchRels(getState().rels.get(RELS_BY_REQUESTED))) {
      const getRequested = () => getState()
            .entities
            .get('rel')
            .filter((r) => r.get('userId') === objectId && r.get('state') === REL_REQUESTED_STATE);
      const last = getRequested()
            .sortBy((r) => r.get('position', 100000))
            .last();
      const sincePosition = last && last.get('position');

      return dispatch(fetchRelsByRequested(objectId, sincePosition))
        .then(() => dispatch(unloadedRels(getRequested().count(), RELS_BY_REQUESTED)));
    }
  };
}
