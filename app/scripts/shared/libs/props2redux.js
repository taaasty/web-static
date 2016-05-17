import uri from 'urijs';
import {
  TLOG_SECTION_TLOG,
  TLOG_SECTION_FAVORITE,
  TLOG_SECTION_PRIVATE,
} from '../constants/Tlog';
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
  flows, appStats, people, userToolbar,
}) {
  const flowsData = flows && uri().path() === '/flows' && fData({ query: uri().query(true) });
  const query = uri().query(true).q;

  return {
    flows: {
      data: { items: [], ...flows },
      isFetching: false,
      filter: flowsData && flowsData.filter,
      error: flows && flows.error,
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
    },
  };
}
