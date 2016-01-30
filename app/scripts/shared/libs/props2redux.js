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
      tlogEntries: { data: props.entries_info, isFetching: false } || void 0,
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
      tlogEntries: { data: { items: [] }, isFetching: false },
      tlogEntry: { data: { ...props.entry, commentator: props.commentator }, isFetching: false } || void 0,
    }
  }
}
