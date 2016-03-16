/*global $ */
import ApiRoutes from '../../../shared/routes/api';
import ErrorService from '../../../shared/react/services/Error';

export const APP_STATS_REQUEST = 'APP_STATS_REQUEST';
export const APP_STATS_RECEIVE = 'APP_STATS_RECEIVE';
export const APP_STATS_ERROR = 'APP_STATS_ERROR';

const UPDATE_INTERVAL = 3600 * 1000; // 1 hour

function appStatsRequest() {
  return {
    type: APP_STATS_REQUEST,
  };
}

function appStatsReceive(data) {
  return {
    type: APP_STATS_RECEIVE,
    payload: data,
  };
}

function appStatsError(error) {
  return {
    type: APP_STATS_ERROR,
    payload: error,
  };
}

function fetchAppStats(url) {
  return $.ajax({ url })
    .fail((xhr) => {
      ErrorService.notifyErrorResponse('Получение статистики приложения', {
        method: 'fetchAppStats(url)',
        methodArguments: { url },
        response: xhr.responseJSON,
      });
    });
}

function shouldFetchAppStats(state) {
  const { data: { users_count }, isFetching, updatedAt } = state.appStats;
  const now = (new Date()).valueOf();

  return (!isFetching && (typeof users_count === 'undefined' || !updatedAt || now - updatedAt > UPDATE_INTERVAL));
}

function getAppStats() {
  return (dispatch) => {
    dispatch(appStatsRequest());
    return fetchAppStats(ApiRoutes.appStats())
      .done((data) => dispatch(appStatsReceive({ data, updatedAt: (new Date()).valueOf() })))
      .fail((error) => dispatch(appStatsError(error.responseJSON)));
  };
}

export function getAppStatsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAppStats(getState())) {
      return dispatch(getAppStats());
    }
  };
}
