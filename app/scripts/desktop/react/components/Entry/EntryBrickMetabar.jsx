import VotingComponent from '../common/Voting';

let EntryBrickMeta = React.createClass({
  propTypes: {
    author: React.PropTypes.object.isRequired,
    rating: React.PropTypes.object.isRequired,
    url: React.PropTypes.string.isRequired,
    commentsCount: React.PropTypes.number.isRequired
  },

  render() {
    return (
      <span className="meta-bar">
        {this.renderMetaVote()}
        {this.renderMetaComments()}
        {this.renderMetaAuthor()}
      </span>
    );
  },

  renderMetaVote() {
    if (this.props.rating.is_voteable) {
      return (
        <span className="meta-item meta-item--vote">
          <span className="meta-item__content">
            <VotingComponent rating={this.props.rating} />
          </span>
        </span>
      );
    }
  },

  renderMetaComments() {
    if (this.props.commentsCount) {
      let title = i18n.t('comments_count', {count: this.props.commentsCount});

      return (
        <span className="meta-item meta-item--comments">
          <span className="meta-item__content">
            <a href={this.props.url + '#comments'}
               title={title}
               className="meta-item__link">
              {title}
            </a>
          </span>
        </span>
      );
    }
  },

  renderMetaAuthor() {
    if (this.props.author.slug !== 'anonymous') {
      return (
        <span className="meta-item meta-item--user">
          <span className="meta-item__content">
            <a href={this.props.author.tlog_url}
               title={this.props.author.tag}
               className="meta-item__link">
              <span className="meta-item__ava">
                <UserAvatar user={this.props.author} size={35} />
              </span>
              <span>{this.props.author.tag}</span>
            </a>
          </span>
        </span>
      );
    }
  }
});

export default EntryBrickMeta;