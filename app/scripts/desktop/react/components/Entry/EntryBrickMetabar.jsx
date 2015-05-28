import Avatar from '../../../../shared/react/components/common/Avatar';
import VotingComponent from '../common/Voting';

let EntryBrickMeta = React.createClass({
  propTypes: {
    tlog: React.PropTypes.object,
    rating: React.PropTypes.object.isRequired,
    url: React.PropTypes.string.isRequired,
    commentsCount: React.PropTypes.number.isRequired,
    entryID: React.PropTypes.number.isRequired
  },

  render() {
    return (
      <span className="meta-bar">
        {this.renderMetaVote()}
        {this.renderMetaComments()}
        {this.renderMetaTlog()}
      </span>
    );
  },

  renderMetaVote() {
    if (this.props.rating.is_voteable) {
      return (
        <span className="meta-item meta-item--vote">
          <span className="meta-item__content">
            <VotingComponent entryID={this.props.entryID} rating={this.props.rating} />
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
            <a href={this.props.url + '#comments'} title={title} className="meta-item__link">
              {title}
            </a>
          </span>
        </span>
      );
    }
  },

  renderMetaTlog() {
    if (this.props.tlog != null) {
      return (
        <span className="meta-item meta-item--user">
          <span className="meta-item__content">
            <a href={this.props.tlog.url}
               title={this.props.tlog.tag}
               className="meta-item__link">
              <span className="meta-item__ava">
                <Avatar userpic={this.props.tlog.userpic} size={20} />
              </span>
              <span>{this.props.tlog.tag}</span>
            </a>
          </span>
        </span>
      );
    }
  }
});

export default EntryBrickMeta;