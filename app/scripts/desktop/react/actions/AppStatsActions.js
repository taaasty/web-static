import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { NORMALIZE_DATA } from '../middleware/normalize';
import { defaultOpts } from './reqHelpers';

export const APP_STATS_REQUEST = 'APP_STATS_REQUEST';
export const APP_STATS_SUCCESS = 'APP_STATS_SUCCESS';
export const APP_STATS_FAILURE = 'APP_STATS_FAILURE';

const UPDATE_INTERVAL = 3600 * 1000; // 1 hour

export function initAppStats(data) {
  return {
    [NORMALIZE_DATA]: {
      schema: Schemas.NONE,
      type: APP_STATS_SUCCESS,
      data,
    },
    updatedAt: (new Date())
      .valueOf(),
  };
}

function fetchAppStats() {
  const endpoint = ApiRoutes.appStats();

  return {
    [CALL_API]: {
      endpoint,
      schema: Schemas.NONE,
      types: [APP_STATS_REQUEST, APP_STATS_SUCCESS, APP_STATS_FAILURE],
      opts: defaultOpts,
    },
    updatedAt: (new Date())
      .valueOf(),
  };
}

function shouldFetchAppStats(state) {
  const { data: { usersCount }, isFetching, updatedAt } = state.appStats;
  const now = (new Date())
    .valueOf();

  return (!isFetching &&
    (typeof usersCount === 'undefined' || !updatedAt || now - updatedAt >
      UPDATE_INTERVAL));
}

export function getAppStatsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAppStats(getState())) {
      return dispatch(fetchAppStats());
    }
  };
}
