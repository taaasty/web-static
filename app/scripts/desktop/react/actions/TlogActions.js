import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { auth } from './CurrentUserActions';

export const TLOG_REQUEST = 'TLOG_REQUEST';
export const TLOG_SUCCESS = 'TLOG_SUCCESS';
export const TLOG_FAILURE = 'TLOG_FAILURE';

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

export function getTlog(slug, requiredFields=[]) {
  return (dispatch, getState) => {
    if (slug) {
      const tlogs = getState().entities.tlog;
      const [ tlogId ] = Object.keys(tlogs).filter((t) => tlogs[t].slug === slug);
      const tlog = tlogs[tlogId];

      if (tlog && requiredFields.every((key) => tlog.hasOwnProperty(key))) {
        return null;
      }

      return !getState().tlog.isFetching && dispatch(fetchTlog(slug));
    }
  };
}
