import { Map } from 'immutable';
import {
  RELATIONSHIP_REQUEST,
  RELATIONSHIP_SUCCESS,
  RELATIONSHIP_FAILURE,
  RELATIONSHIP_RESET_ERROR,
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
  case RELATIONSHIP_RESET_ERROR:
    if (relId) {
      return state.setIn([ relId, 'error' ], null);
    }
    break;
  }

  return state;
}
