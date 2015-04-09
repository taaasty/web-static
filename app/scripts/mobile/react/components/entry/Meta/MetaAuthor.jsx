import UserAvatar from '../../common/avatar/user';

let EntryMetaAuthor = React.createClass({
  propTypes: {
    author: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <a href={this.props.author.tlog_url} className="meta-author">
        <span className="meta-author__avatar">
          <UserAvatar user={this.props.author} size={28} />
        </span>
        <span className="meta-author__name">
          @{this.props.author.slug}
        </span>
      </a>
    );
  }
});

export default EntryMetaAuthor;