import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { TLOG_SECTION_TLOG } from '../../../shared/constants/Tlog';
import { makeGetUrl, defaultOpts } from './reqHelpers';

export const TLOG_ENTRIES_REQUEST = 'TLOG_ENTRIES_REQUEST';
export const TLOG_ENTRIES_SUCCESS = 'TLOG_ENTRIES_SUCCESS';
export const TLOG_ENTRIES_FAILURE = 'TLOG_ENTRIES_FAILURE';

export const TLOG_ENTRIES_DELETE_ENTRY = 'TLOG_ENTRIES_DELETE_ENTRY';
export const TLOG_ENTRIES_RESET = 'TLOG_ENTRIES_RESET';
export const TLOG_ENTRIES_INVALIDATE = 'TLOG_ENTRIES_INVALIDATE';

const INITIAL_LOAD_LIMIT = 10;

function tlogEntriesReset() {
  return {
    type: TLOG_ENTRIES_RESET,
  };
}

function endpoint(slug, section = TLOG_SECTION_TLOG, params) {
  return makeGetUrl(ApiRoutes.tlogEntries(slug, section, 'tlogs'), params);
}

function signature({ slug = '', section = '', date = '', query = '' }) {
  return `${slug}-${section}-${date}-${query}`;
}

function fetchTlogEntries(endpoint, slug, signature) {
  return {
    slug,
    signature,
    [CALL_API]: {
      endpoint,
      types: [TLOG_ENTRIES_REQUEST, TLOG_ENTRIES_SUCCESS, TLOG_ENTRIES_FAILURE],
      schema: Schemas.ENTRY_COLL,
      opts: defaultOpts,
    },
  };
}

function shouldFetchTlogEntries(state, params) {
  const { isFetching, signature: cSignature, invalid } = state.tlogEntries;

  return !isFetching && (invalid || signature(params) !== cSignature);
}

export function getTlogEntries(params) {
  return (dispatch) => {
    const { slug, section, date, query, sinceId } = params;

    return dispatch(fetchTlogEntries(
      endpoint(slug, section, {
        date,
        limit: date ? void 0 : INITIAL_LOAD_LIMIT,
        sinceEntryId: sinceId || void 0,
        q: query || void 0,
      }),
      slug,
      signature(params)
    ));
  };
}

export function getTlogEntriesIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchTlogEntries(getState(), params)) {
      dispatch(tlogEntriesReset());
      return dispatch(getTlogEntries(params));
    }
  };
}

export function deleteEntry(entryId) {
  return {
    type: TLOG_ENTRIES_DELETE_ENTRY,
    entryId,
  };
}

export function tlogEntriesInvalidate() {
  return {
    type: TLOG_ENTRIES_INVALIDATE,
  };
}
