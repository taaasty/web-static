import { initialState as tlogEntriesInitialState } from '../../desktop/react/reducers/tlogEntries'; //FIXME desktop only store

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
      tlogEntry: {},
      tlogEntries: { ...props.entries_info, loadUrl: props.loadUrl } || tlogEntriesInitialState,
    };
  }
}
