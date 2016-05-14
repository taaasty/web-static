import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts } from './reqHelpers';

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
      opts: defaultOpts,
    },
  };
}

export function getTlog(slug, requiredFields=[]) {
  return (dispatch, getState) => {
    if (slug) {
      const tlog = getState().entities
              .get('tlog')
              .find((t) => t.get('slug') === slug);

      if (tlog && requiredFields.every((key) => tlog.has(key))) {
        return null;
      }

      return !getState().tlog.isFetching && dispatch(fetchTlog(slug));
    }
  };
}
