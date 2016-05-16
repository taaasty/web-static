import { Map } from 'immutable';
import {
  RELATIONSHIP_REQUEST,
  RELATIONSHIP_SUCCESS,
  RELATIONSHIP_FAILURE,
} from '../actions/RelationshipActions';

export default function relState(state=Map(), { type, relId, error }) {
  switch (type) {
  case RELATIONSHIP_REQUEST:
    if (relId) {
      return state.mergeIn([ relId ], { isFetching: true, error: null });
    }
    break;
  case RELATIONSHIP_SUCCESS:
    if (relId) {
      return state.mergeIn([ relId ], { isFetching: false, error: null });
    }
    break;
  case RELATIONSHIP_FAILURE:
    if (relId) {
      return state.mergeIn([ relId ], { isFetching: false, error });
    }
    break;
  }

  return state;
}
