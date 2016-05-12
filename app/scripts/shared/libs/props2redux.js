/*global AppStorage */
import uri from 'urijs';
import {
  TLOG_SECTION_TLOG,
  TLOG_SECTION_FAVORITE,
  TLOG_SECTION_PRIVATE,
} from '../constants/Tlog';
import { VIEW_STYLE_BRICKS } from '../../desktop/react/constants/ViewStyleConstants';
import { FEED_VIEW_STYLE_LS_KEY } from '../../desktop/react/reducers/feedEntries';
import { feedDataByUri, filterFeedItems } from '../../desktop/react/actions/FeedEntriesActions';
import { flowsData as fData } from '../../desktop/react/actions/FlowsActions';
import { initialState as feedStatusInitialState } from '../../desktop/react/reducers/feedStatus';

const mapSection = {
  'favorites': TLOG_SECTION_FAVORITE,
  'privates': TLOG_SECTION_PRIVATE,
};

function section() {
  const matches = uri().path().match(/\~[^\/]+\/(favorites|privates)/);
  return matches
    ? mapSection[matches[1]]
    : TLOG_SECTION_TLOG;
}

function date() {
  const m = uri().path().match(/\~[^\/]+\/(\d{4})\/(\d{1,2})\/(\d{1,2})/);

  return m ? `${m[1]}-${m[2]}-${m[3]}` : void 0;
}

function peopleSort() {
  const m = uri().path().match(/\/people\/?(posts|followers|interested|worst|comments|new|bad)/);

  return m ? m[1] : void 0;
}

export default function prop2redux({
  flows, feedEntries, appStats, people, userToolbar,
}) {
  const feedData = feedEntries && feedDataByUri({ pathname: uri().path(), query: uri().query(true) }) || {};
  const flowsData = flows && uri().path() === '/flows' && fData({ query: uri().query(true) });
  const query = uri().query(true).q;

  return {
    flows: {
      data: { items: [], ...flows },
      isFetching: false,
      filter: flowsData && flowsData.filter,
      error: flows && flows.error,
    },
    feedEntries: {
      data: { ...feedEntries, items: (feedEntries && feedEntries.items && filterFeedItems(feedEntries.items)) || [] },
      isFetching: false,
      apiType: feedData.apiType,
      query: feedEntries && query,
      rating: feedData.rating,
      sinceId: feedData.sinceId,
      error: feedEntries && feedEntries.error ? { error: feedEntries.error } : void 0,
      viewStyle: AppStorage.getItem(FEED_VIEW_STYLE_LS_KEY) || VIEW_STYLE_BRICKS,
    },
    appStats: {
      data: appStats || {},
      isFetching: false,
      error: appStats && appStats.error,
      updatedAt: appStats && (new Date()).valueOf(),
    },
    people: {
      data: people || [],
      isFetching: false,
      query: people && query,
      sort: people && (peopleSort() || 'posts'),
      error: null,
    },
    feedStatus: {
      ...feedStatusInitialState,
      ...userToolbar,
    }
  };
}
