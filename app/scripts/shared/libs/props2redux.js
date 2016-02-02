import uri from 'urijs';
import {
  TLOG_SECTION_TLOG,
  TLOG_SECTION_FAVORITE,
  TLOG_SECTION_PRIVATE,
  TLOG_SECTION_FLOW,
} from '../constants/Tlog';

const mapSection = {
  'tlog': TLOG_SECTION_TLOG,
  'favorite': TLOG_SECTION_FAVORITE,
  'private': TLOG_SECTION_PRIVATE,
  'flow': TLOG_SECTION_FLOW,
};

function parseUrl2Date(url) {
  const path = uri(url).path();
  const matches = path.match(/^\/\~[^\/]+\/(\d{4})\/(\d{1,2})\/(\d{1,2})/);

  return (matches.length === 4) && `${matches[1]}-${matches[2]}-${matches[3]}`;
}

export default function prop2redux(component, props) {
  const slug = props.user && props.user.slug;

  if (component === 'TlogPageContainer') {
    return {
      tlog: {
        data: {
          author: props.user,
          design: {
            backgroundImageUrl: props.bgImage,
            feedOpacity: props.bgStyle && props.bgStyle.opacity,
          },
          id: props.user.id,
          my_relationship: props.relationship && props.relationship.state,
          slug: slug,
          stats: props.stats,
          tlog_url: props.user && props.user.tlog_url,
        },
      },
      tlogEntries: {
        data: {
          items: [],
          has_more: false,
          ...props.entries_info,
          next_date: props.nextPageUrl && parseUrl2Date(props.nextPageUrl),
          prev_date: props.prevPageUrl && parseUrl2Date(props.prevPageUrl),
        },
        isFetching: false,
        slug: slug,
        section: mapSection[props.section],
        type: 'tlogs',
      } || void 0,
    };
  } else if (component === 'EntryPageContainer') {
    return {
      tlog: {
        data: {
          author: props.user,
          design: {
            backgroundImageUrl: props.bgImage,
            feedOpacity: props.bgStyle && props.bgStyle.opacity,
          },
          id: props.user.id,
          my_relationship: props.relationship && props.relationship.state,
          slug: slug,
          stats: props.stats,
          tlog_url: props.user && props.user.tlog_url,
        },
      },
      tlogEntries: {
        data: { items: [] },
        isFetching: false,
      },
      tlogEntry: { data: { ...props.entry, commentator: props.commentator }, isFetching: false } || void 0,
    }
  }
}
