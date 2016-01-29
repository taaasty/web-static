export default function prop2redux(component, props) {
  if (component === 'TlogPageContainer') {
    return {
      tlog: {
        author: props.user,
        design: {
          backgroundImageUrl: props.bgImage,
          feedOpacity: props.bgStyle && props.bgStyle.opacity,
        },
        slug: props.user && props.user.slug,
        tlog_url: props.user && props.user.tlog_url,
        my_relationship: props.relationship && props.relationship.state,
        stats: props.stats,
      },
      tlogEntries: { ...props.entries_info, isFetching: false } || void 0,
    };
  } else if (component === 'EntryPageContainer') {
    return {
      tlog: {
        author: props.user,
        design: {
          backgroundImageUrl: props.bgImage,
          feedOpacity: props.bgStyle && props.bgStyle.opacity,
        },
        slug: props.user && props.user.slug,
        tlog_url: props.user && props.user.tlog_url,
        my_relationship: props.relationship && props.relationship.state,
        stats: props.stats,
      },
      tlogEntry: { ...props.entry, isFetching: false } || void 0,
    }
  }
}
