import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { TLOG_SECTION_TLOG } from '../../../shared/constants/Tlog';

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

function identity(v) {
  return v;
}

function auth(state) {
  return state.currentUser.data && {
    headers: {
      'X-User-Token': state.currentUser.data.api_key.access_token,
    },
  };
}

function endpoint(slug, section=TLOG_SECTION_TLOG, params) {
  const paramStr = Object.keys(params)
          .map((k) => params[k] && `${k}=${encodeURIComponent(params[k])}`)
          .filter(identity)
          .join('&');
  return [
    ApiRoutes.tlogEntries(slug, section, 'tlogs'),
    paramStr,
  ].filter(identity).join('?');
}

function signature({ slug='', section='', date='', query='' }) {
  return `${slug}-${section}-${date}-${query}`;
}

function fetchTlogEntries(endpoint, signature) {
  return {
    signature,
    [CALL_API]: {
      endpoint,
      types: [ TLOG_ENTRIES_REQUEST, TLOG_ENTRIES_SUCCESS, TLOG_ENTRIES_FAILURE ],
      schema: Schemas.ENTRY_COLL,
      opts: auth,
    },
  };
}

function shouldFetchTlogEntries(state, params) {
  const { isFetching, signature: cSignature, invalid } = state.tlogEntries;

  return !isFetching && (invalid || signature(params) !== cSignature);
}

function getTlogEntries(params) {
  return (dispatch) => {
    const { slug, section, date, query, sinceId } = params;

    dispatch(tlogEntriesReset());
    return dispatch(fetchTlogEntries(
      endpoint(slug, section, {
        date,
        limit: date ? void 0 : INITIAL_LOAD_LIMIT,
        since_entry_id: sinceId || void 0,
        q: query || void 0,
      }),
      signature(params)
    ));
  };
}

export function getTlogEntriesIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchTlogEntries(getState(), params)) {
      return dispatch(getTlogEntries(params));
    }
  };
}

export function appendTlogEntries() {
  return (dispatch, getState) => {
    const { isFetching, section, slug, query, data: { next_since_entry_id } } = getState().tlogEntries;

    if (isFetching) {
      return null;
    }

    const url = ApiRoutes.tlogEntries(slug, section, 'tlogs');
    const params = {
      since_entry_id: next_since_entry_id || void 0,
      q: query || void 0,
    };

    return fetchTlogEntries(url, params)
      .then((data) => {
        const prevItems = getState().tlogEntries.data.items;
        dispatch(tlogEntriesReceive({ data: { ...data, items: prevItems.concat(data.items) } }));
        return data;
      })
      .fail((error) => dispatch(tlogEntriesError({ error: error.responseJSON })));
  };
}

export function deleteEntry(entryId) {
  return {
    type: TLOG_ENTRIES_DELETE_ENTRY,
    payload: entryId,
  };
}

export function tlogEntriesInvalidate() {
  return {
    type: TLOG_ENTRIES_INVALIDATE,
  };
}
