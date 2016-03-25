/*global $ */
import ApiRoutes from '../../../shared/routes/api';
import ErrorService from '../../../shared/react/services/Error';

export const TAG_ENTRIES_RESET = 'TAG_ENTRIES_RESET';
export const TAG_ENTRIES_REQUEST = 'TAG_ENTRIES_REQUEST';
export const TAG_ENTRIES_RECEIVE = 'TAG_ENTRIES_RECEIVE';
export const TAG_ENTRIES_ERROR = 'TAG_ENTRIES_ERROR';

const encode = window.encodeURIComponent;

const INITIAL_LOAD_LIMIT = 45;
const APPEND_LOAD_LIMIT = 15;

function tagEntriesReceive(data) {
  return {
    type: TAG_ENTRIES_RECEIVE,
    payload: data,
  };
}

function tagEntriesRequest() {
  return {
    type: TAG_ENTRIES_REQUEST,
  };
}

function tagEntriesError(error) {
  return {
    type: TAG_ENTRIES_ERROR,
    payload: error,
  };
}

function tagEntriesReset() {
  return {
    type: TAG_ENTRIES_RESET,
  };
}

function url(slug, tags) {
  return slug ? ApiRoutes.tagsTlog(slug, encode(tags)) : ApiRoutes.tagsFeed(encode(tags));
}

function fetchTagEntries(url, data) {
  return $.ajax({ url, data })
    .fail((xhr) => {
      ErrorService.notifyErrorResponse('Загрузка записей по тэгам', {
        method: 'fetchTagEntries(url, data)',
        methodArguments: { url, data },
        response: xhr.responseJSON,
      });
    });
}

function getTagEntries({ slug='', tags }) {
  return (dispatch) => {
    dispatch(tagEntriesRequest());
    dispatch(tagEntriesReset());
    return fetchTagEntries(url(slug, tags), { limit: INITIAL_LOAD_LIMIT })
      .then((data) => dispatch(tagEntriesReceive({ data, slug, tags })))
      .fail((error) => dispatch(tagEntriesError({ error: error.responseJSON, slug, tags })));
  };
}

function shouldFetchTagEntries(state, { slug, tags }) {
  const { isFetching, slug: cSlug, tags: cTags } = state.tagEntries;

  return !isFetching && (slug !== cSlug || tags !== cTags);
}

export function getTagEntriesIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchTagEntries(getState(), params)) {
      return dispatch(getTagEntries(params));
    }
  };
}

export function appendTagEntries() {
  return (dispatch, getState) => {
    const { isFetching, slug, tags, data: { next_since_entry_id } } = getState().tagEntries;

    if (isFetching) {
      return null;
    }

    return fetchTagEntries(url(slug, tags), {
      since_entry_id: next_since_entry_id,
      limit: APPEND_LOAD_LIMIT,
    })
      .done((data) => {
        const prevItems = getState().tagEntries.data.items;
        dispatch(tagEntriesReceive({ data: { ...data, items: prevItems.concat(data.items) } }));
        return data;
      })
      .fail((error) => dispatch(tagEntriesError({ error: error.responseJSON })));
  };
}
