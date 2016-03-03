/*global $ */
import ApiRoutes from '../../../shared/routes/api';
import ErrorService from '../../../shared/react/services/Error';

export const PEOPLE_REQUEST = 'PEOPLE_REQUEST';
export const PEOPLE_RECEIVE = 'PEOPLE_RECEIVE';
export const PEOPLE_ERROR = 'PEOPLE_ERROR';
export const PEOPLE_RESET = 'PEOPLE_RESET';

function peopleRequest() {
  return {
    type: PEOPLE_REQUEST,
  };
}

function peopleReceive(data) {
  return {
    type: PEOPLE_RECEIVE,
    payload: data,
  };
}

function peopleError(error) {
  return {
    type: PEOPLE_ERROR,
    payload: error,
  };
}

function peopleReset() {
  return {
    type: PEOPLE_RESET,
  };
}

function fetchPeople(url, data) {
  return $.ajax({ url, data })
    .fail((xhr) => ErrorService.notifyErrorResponse('Получение списка пользователей', {
      method: 'fetchPeople(url, data)',
      methodArguments: { url, data },
      response: xhr.responseJSON,
    }));
}

function shouldFetchPeople(state, { sort }) {
  const { isFetching, sort: cSort } = state.people;

  return !isFetching && sort !== cSort;
}

function getPeople({ sort }) {
  return (dispatch) => {
    dispatch(peopleRequest());
    dispatch(peopleReset());
    return fetchPeople(ApiRoutes.users(), { sort })
      .done((data) => dispatch(peopleReceive({ data, sort })))
      .fail((error) => dispatch(peopleError({ error: error.responseJSON, sort })));
  };
}

export function getPeopleIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchPeople(getState(), params)) {
      return dispatch(getPeople(params));
    }
  };
}
