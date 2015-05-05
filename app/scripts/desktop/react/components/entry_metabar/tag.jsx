let EntryMetabarTag = React.createClass({
  propTypes: {
    tag: React.PropTypes.string.isRequired,
    userSlug: React.PropTypes.string.isRequired
  },

  render() {
    let { userSlug, tag } = this.props;

    return (
      <a href={Routes.userTag(userSlug, tag)}
         target="_blank"
         title={`#${tag}`}
         className="meta-item__common meta-item__link">
        {`#${tag}`}
      </a>
    );
  }
});

export default EntryMetabarTag;