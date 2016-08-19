import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { defaultOpts, makeGetUrl } from './reqHelpers';

export const TAG_ENTRIES_REQUEST = 'TAG_ENTRIES_REQUEST';
export const TAG_ENTRIES_SUCCESS = 'TAG_ENTRIES_SUCCESS';
export const TAG_ENTRIES_FAILURE = 'TAG_ENTRIES_FAILURE';

const encode = window.encodeURIComponent;

const INITIAL_LOAD_LIMIT = 25;
const APPEND_LOAD_LIMIT = 15;

function getSignature(slug, tags) {
  return `${slug}--${tags}`;
}

function tagsUrl(slug, tags) {
  return slug ?
    ApiRoutes.tagsTlog(slug, encode(tags)) :
    ApiRoutes.tagsFeed(encode(tags));
}

function fetchTagEntries({ slug = '', tags, ...rest }) {
  return {
    [CALL_API]: {
      endpoint: makeGetUrl(tagsUrl(slug, tags), rest),
      schema: Schemas.ENTRY_COLL,
      types: [
        TAG_ENTRIES_REQUEST,
        TAG_ENTRIES_SUCCESS,
        TAG_ENTRIES_FAILURE,
      ],
      opts: defaultOpts,
    },
    signature: getSignature(slug, tags),
  };
}

function shouldFetchTagEntries(state, { slug, tags }) {
  const signature = getSignature(slug, tags);
  const { isFetching, signature: cSignature } = state.tagEntries;

  return !isFetching && (signature !== cSignature);
}

function getTagEntries({ slug = '', tags }) {
  return fetchTagEntries({ slug, tags, limit: INITIAL_LOAD_LIMIT })
}

export function getTagEntriesIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchTagEntries(getState(), params)) {
      return dispatch(getTagEntries(params));
    }
  };
}

export function appendTagEntries({ slug = '', tags }) {
  return (dispatch, getState) => {
    const { isFetching, data: { nextSinceEntryId } } = getState()
      .tagEntries;

    if (isFetching) {
      return null;
    }

    return dispatch(fetchTagEntries({
      slug,
      tags,
      sinceEntryId: nextSinceEntryId,
      limit: APPEND_LOAD_LIMIT,
    }));
  };
}
