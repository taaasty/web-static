import createReducer from './createReducer';
import {
  RELS_REQUEST,
  RELS_SUCCESS,
  RELS_FAILURE,
  RELS_BY_FRIEND,
  RELS_TO_IGNORED,
} from '../actions/RelsActions';
import Immutable, { Map, OrderedSet } from 'immutable';

const initialTypeState = {
  relationships: [],
  metadata: {},
  signature: '',
  isFetching: false,
  error: null,
};

const initialState = Map.fromJS({
  [RELS_BY_FRIEND]: initialTypeState,
  [RELS_TO_IGNORED]: initialTypeState,
}, (key, val) => key === 'relationships' ? val.toOrderedSet()
                                : (Immutable.Iterable.isIndexed(val) ? val.toList() : val.toMap()));

const actionMap = {
  [RELS_REQUEST](state, { type }) {
    return state.mergeIn([ type ], {
      isFetching: true,
      error: null,
    });
  },

  [RELS_SUCCESS](state, { response, type, signature }) {
    const relationships = state.getIn([ type, 'signature' ]) === signature
          ? state.getIn([ type, 'result', 'relationships' ], OrderedSet()).union(response.result.relationships)
          : response.result.relationships.toOrderedSet();
    const metadata = {
      totalCount: response.result.totalCount,
    };

    return state.mergeIn([ type ], {
      relationships,
      metadata,
      signature,
      isFetching: false,
      error: null,
    });
  },

  [RELS_FAILURE](state, { error, type, signature }) {
    return state.mergeIn([ type ], {
      error,
      signature,
      isFetching: false,
    });
  },
};

export default createReducer(initialState, actionMap);
