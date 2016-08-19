import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts } from './reqHelpers';
import { List } from 'immutable';

export const USER_ONBOARDING_REQUEST = 'USER_ONBOARDING_REQUEST';
export const USER_ONBOARDING_SUCCESS = 'USER_ONBOARDING_SUCCESS';
export const USER_ONBOARDING_FAILURE = 'USER_ONBOARDING_FAILURE';

function fetchOnboarding() {
  return {
    [CALL_API]: {
      endpoint: ApiRoutes.onboarding_url(),
      schema: Schemas.RELATIONSHIP_COLL,
      types: [ USER_ONBOARDING_REQUEST, USER_ONBOARDING_SUCCESS, USER_ONBOARDING_FAILURE ],
      opts: defaultOpts,
    },
  };
}

export function loadOnboarding() {
  return (dispatch, getState) => {
    const state = getState().userOnboarding;

    if (!state.get('isFetching') && state.getIn([ 'data', 'relationships' ], List()).count() === 0) {
      return dispatch(fetchOnboarding());
    }
  };
}
