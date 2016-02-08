import uri from 'urijs';
import {
  TLOG_SECTION_TLOG,
  TLOG_SECTION_FAVORITE,
  TLOG_SECTION_PRIVATE,
} from '../constants/Tlog';
import { VIEW_STYLE_TLOG } from '../../desktop/react/constants/ViewStyleConstants';
import { FLOW_VIEW_STYLE_LS_KEY } from '../../desktop/react/reducers/flow';

const mapSection = {
  'favorites': TLOG_SECTION_FAVORITE,
  'privates': TLOG_SECTION_PRIVATE,
};

function section() {
  const matches = uri().path().match(/\~[^\/]+\/(favorites|privates)/);
  return matches ? mapSection[matches[1]] : TLOG_SECTION_TLOG;
}

export default function prop2redux(props) {
  return {
    tlog: {
      data: props.tlog || { author: {}, design: {}, stats: {} },
      slug: props.tlog.slug,
    },
    tlogEntries: {
      data: props.tlogEntries || { items: [] },
      isFetching: false,
      slug: props.tlogEntries && props.tlog.slug,
      section: section(),
      type: 'tlogs',
      sinceId: uri().search(true).since_entry_id,
      error: props.error ? { error_code: props.error } : void 0,
    },
    tlogEntry: {
      data: props.tlogEntry ? { ...props.tlogEntry, url: props.tlogEntry.entry_url } : { author: {}, tlog: {}, commentator: null },
      id: props.tlogEntry && props.tlogEntry.id,
      isFetching: false,
      error: props.error ? { error_code: props.error } : void 0,
    },
    flow: {
      data: props.flow || { flowpic: {}, staffs: [] },
      id: props.flow && props.flow.id,
      isFetching: false,
      viewStyle: window.localStorage.getItem(FLOW_VIEW_STYLE_LS_KEY) || VIEW_STYLE_TLOG,
    },
  };
}
