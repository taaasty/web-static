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
    };
  }
}
