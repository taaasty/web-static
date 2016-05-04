import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { auth } from './CurrentUserActions';

export const TLOG_REQUEST = 'TLOG_REQUEST';
export const TLOG_SUCCESS = 'TLOG_SUCCESS';
export const TLOG_FAILURE = 'TLOG_FAILURE';

function shouldFetchTlog(state, slug) {
  const tlog = state.entities.tlog[state.tlog.data];

  return (!state.tlog.isFetching && (!tlog || tlog.slug !== slug));
}

function fetchTlog(slug) {
  const endpoint = ApiRoutes.tlog(slug);

  return {
    [CALL_API]: {
      endpoint,
      schema: Schemas.TLOG,
      types: [ TLOG_REQUEST, TLOG_SUCCESS, TLOG_FAILURE ],
      opts: auth,
    },
  };
}

export function getTlog(slug) {
  return (dispatch, getState) => {
    if (slug && shouldFetchTlog(getState(), slug)) {
      return dispatch(fetchTlog(slug));
    }
  };
}
