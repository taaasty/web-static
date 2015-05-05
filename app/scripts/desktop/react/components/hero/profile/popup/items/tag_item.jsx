window.HeroProfileStats_TagItem = React.createClass({
  propTypes: {
    tag: React.PropTypes.object.isRequired,
    userSlug: React.PropTypes.string.isRequired
  },

  render() {
    let { userSlug, tag } = this.props;

    return (
      <article className="tag">
        <a href={Routes.userTag(userSlug, tag.name)}
           title={`#${tag.name}`}
           className="tag__link">
          <span className="tag__count">
            {tag.taggings_count}
          </span>
          <span className="tag__text">
            {`#${tag.name}`}
          </span>
        </a>
      </article>
    );
  }
});