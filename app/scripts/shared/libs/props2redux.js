/*global AppStorage */
import uri from 'urijs';
import {
  TLOG_SECTION_TLOG,
  TLOG_SECTION_FAVORITE,
  TLOG_SECTION_PRIVATE,
} from '../constants/Tlog';
import { VIEW_STYLE_TLOG, VIEW_STYLE_BRICKS } from '../../desktop/react/constants/ViewStyleConstants';
import { FLOW_VIEW_STYLE_LS_KEY } from '../../desktop/react/reducers/flow';
import { FEED_VIEW_STYLE_LS_KEY } from '../../desktop/react/reducers/feedEntries';

const mapSection = {
  'favorites': TLOG_SECTION_FAVORITE,
  'privates': TLOG_SECTION_PRIVATE,
};

function section() {
  const matches = uri().path().match(/\~[^\/]+\/(favorites|privates)/);
  return matches ? mapSection[matches[1]] : TLOG_SECTION_TLOG;
}

export default function prop2redux({ tlog, tlogEntry, tlogEntries, flow, feedEntries, appStats }) {
  const slug = tlog && tlog.slug;
  const feedType = 'live';
  const bestRating = 'excellent';

  return {
    tlog: {
      slug,
      data: { author: {}, design: {}, stats: {}, ...tlog },
    },
    tlogEntries: {
      data: { items: [], ...tlogEntries },
      isFetching: false,
      slug: tlogEntries && slug,
      section: section(),
      type: 'tlogs',
      sinceId: uri().search(true).since_entry_id,
      error: tlogEntries && tlogEntries.error ? { error: tlogEntries.error } : void 0,
    },
    tlogEntry: {
      data: {
        author: {},
        tlog: {},
        commentator: null,
        ...tlogEntry,
        url: tlogEntry && tlogEntry.entry_url,
      },
      id: tlogEntry && tlogEntry.id,
      isFetching: false,
      error: tlogEntry && tlogEntry.error ? { error_code: tlogEntry.error } : void 0,
    },
    flow: {
      data: { flowpic: {}, staffs: [], ...flow },
      id: flow && flow.id,
      isFetching: false,
      viewStyle: AppStorage.getItem(FLOW_VIEW_STYLE_LS_KEY) || VIEW_STYLE_TLOG,
    },
    feedEntries: {
      data: { items: [], ...feedEntries },
      isFetching: false,
      type: feedType,
      rating: bestRating,
      error: feedEntries && feedEntries.error ? { error: feedEntries.error } : void 0,
      viewStyle: AppStorage.getItem(FEED_VIEW_STYLE_LS_KEY) || VIEW_STYLE_BRICKS,
    },
    appStats: {
      data: appStats,
      isFetching: false,
      error: appStats && appStats.error,
    },
  };
}
