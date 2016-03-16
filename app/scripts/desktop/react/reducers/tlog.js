import createReducer from './createReducer';
import {
  TLOG_REQUEST,
  TLOG_RECEIVE,
  TLOG_ERROR,
  TLOG_UPDATE,
} from '../actions/TlogActions';
import {
  RELATIONSHIP_REQUEST,
  RELATIONSHIP_ERROR,
  RELATIONSHIP_UPDATE,
} from '../actions/RelationshipActions';

const initialState = {
  data: {
    author: {
      userpic: {},
    },
    design: {
      backgroundImageUrl: '',
      feedOpacity: '',
    },
    slug: '',
    tlog_url: '',
    my_relationship: '',
    stats: {},
  },
  slug: null,
  isFetching: false,
  isFetchingRelationship: false,
  error: null,
  errorRelationship: null,
};

const actionMap = {
  [TLOG_REQUEST](state) {
    return { ...state, isFetching: true, error: null };
  },
  [TLOG_RECEIVE](state, data) {
    return { ...data, isFetching: false, error: null };
  },
  [TLOG_ERROR](state, error) {
    return { ...state, ...error, isFetching: false };
  },
  [TLOG_UPDATE](state, data) {
    return { ...state, data: { ...state.data, ...data } };
  },
  [RELATIONSHIP_UPDATE](state, { id, data }) {
    return (state.data.author && state.data.author.id === id)
      ? {
          ...state,
          data: { ...state.data, my_relationship: data.state },
          isFetchingRelationship: false,
          errorRelationship: null,
        }
      : state;
  },
  [RELATIONSHIP_REQUEST](state, id) {
    return (state.data.author && state.data.author.id === id)
      ? {
          ...state,
          isFetchingRelationship: true,
          errorRelationship: null,
        }
      : state;
  },
  [RELATIONSHIP_ERROR](state, { id, error }) {
    return (state.data.author && state.data.author.id === id)
      ? {
          ...state,
          isFetchingRelationship: false,
          errorRelationship: error,
        }
      : state;
  },
};

export default createReducer(initialState, actionMap);
