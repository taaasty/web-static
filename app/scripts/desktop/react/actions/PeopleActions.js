import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts, makeGetUrl } from './reqHelpers';
import ApiRoutes from '../../../shared/routes/api';

export const PEOPLE_REQUEST = 'PEOPLE_REQUEST';
export const PEOPLE_SUCCESS = 'PEOPLE_SUCCESS';
export const PEOPLE_FAILURE = 'PEOPLE_FAILURE';
export const PEOPLE_RECOMMENDED_REQUEST = 'PEOPLE_RECOMMENDED_REQUEST';
export const PEOPLE_RECOMMENDED_SUCCESS = 'PEOPLE_RECOMMENDED_SUCCESS';
export const PEOPLE_RECOMMENDED_FAILURE = 'PEOPLE_RECOMMENDED_FAILURE';

const RECOMMENDED_LIMIT = 8;

function signature({ sort='', query='' }) {
  return `${sort}--${query}`;
}

function fetchPeople(params) {
  const { sort, query } = params;

  return {
    [CALL_API]: {
      endpoint: makeGetUrl(ApiRoutes.users(), { sort, q: query }),
      schema: Schemas.PEOPLE_COLL,
      types: [ PEOPLE_REQUEST, PEOPLE_SUCCESS, PEOPLE_FAILURE ],
      opts: defaultOpts,
    },
    signature: signature(params),
  };
}

function shouldFetchPeople(state, params) {
  const { people } = state;

  return !people.get('isFetching') && people.get('signature') !== signature(params);
}

export function getPeopleIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchPeople(getState(), params)) {
      return dispatch(fetchPeople(params));
    }
  };
}

export function getRecommendedPeople() {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(ApiRoutes.users(), { sort: 'recommended', limit: RECOMMENDED_LIMIT }),
      schema: Schemas.PEOPLE_COLL,
      types: [ PEOPLE_RECOMMENDED_REQUEST, PEOPLE_RECOMMENDED_SUCCESS, PEOPLE_RECOMMENDED_FAILURE ],
      opts: defaultOpts,
    },
  };
}
