import EntryMetabarTag from './tag';

let EntryMetabarTags = React.createClass({
  propTypes: {
    tags: React.PropTypes.array.isRequired,
    userSlug: React.PropTypes.string.isRequired
  },

  render() {
    if (this.props.tags.length) {
      let tagList = this.props.tags.map ((tag, i) => {
        if (i !== this.props.tags.length - 1) {
          return (
            <span key={i}>
              <EntryMetabarTag tag={tag} userSlug={this.props.userSlug} />
              <span className="meta-item__common" key={`${i} comma`}>, </span>
            </span>
          );
        } else {
          return (
            <EntryMetabarTag
                tag={tag}
                userSlug={this.props.userSlug}
                key={i} />
          );
        }
      });

      return (
        <span className="meta-item meta-item--tags">
          <span className="meta-item__content">{tagList}</span>
        </span>
      );
    } else {
      return null;
    }
  }
});

export default EntryMetabarTags;