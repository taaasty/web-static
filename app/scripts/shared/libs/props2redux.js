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

export default function prop2redux(component, props) {
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
          slug: props.user && props.user.slug,
          stats: props.stats,
          tlog_url: props.user && props.user.tlog_url,
        },
      },
      tlogEntries: {
        data: props.entries_info,
        isFetching: false,
        slug: props.user && props.user.slug,
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
          slug: props.user && props.user.slug,
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
