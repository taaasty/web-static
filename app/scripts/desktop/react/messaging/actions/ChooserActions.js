import ApiRoutes from '../../../../shared/routes/api';
import { CALL_API, Schemas } from '../../middleware/api';
import { defaultOpts, makeGetUrl } from '../../actions/reqHelpers';

export const MSG_CHOOSER_USERS_REQUEST = 'MSG_CHOOSER_USERS_REQUEST';
export const MSG_CHOOSER_USERS_SUCCESS = 'MSG_CHOOSER_USERS_SUCCESS';
export const MSG_CHOOSER_USERS_FAILURE = 'MSG_CHOOSER_USERS_FAILURE';

export const MSG_CHOOSER_SELECT_NEXT = 'MSG_CHOOSER_SELECT_NEXT';
export const MSG_CHOOSER_SELECT_PREV = 'MSG_CHOOSER_SELECT_PREV';

export const MSG_CHOOSER_SET_QUERY = 'MSG_CHOOSER_SET_QUERY';

export function resetChooserQuery() {
  return setChooserQuery('');
}

export function setChooserQuery(query) {
  return (dispatch, getState) => {
    const prevQuery = getState()
      .msg
      .chooser.get('query');

    dispatch({
      type: MSG_CHOOSER_SET_QUERY,
      query,
    });

    if (query.length > 0 && query !== prevQuery) {
      return dispatch(getPredictUsers(query));
    }
  };
}

export function getPredictUsers(query) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(ApiRoutes.users_predict(), { query }),
      schema: Schemas.TLOG_COLL,
      types: [
        MSG_CHOOSER_USERS_REQUEST,
        MSG_CHOOSER_USERS_SUCCESS,
        MSG_CHOOSER_USERS_FAILURE,
      ],
      opts: defaultOpts,
    },
    query,
  };
}

export function selectNext() {
  return {
    type: MSG_CHOOSER_SELECT_NEXT,
  };
}

export function selectPrev() {
  return {
    type: MSG_CHOOSER_SELECT_PREV,
  };
}
