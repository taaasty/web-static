import React, { PropTypes } from 'react';
import Avatar from '../../../../../shared/react/components/common/Avatar';
import VotingComponent from '../../common/Voting';

let EntryBrickMetabar = React.createClass({
  propTypes: {
    commentsCount: PropTypes.number.isRequired,
    entryID: PropTypes.number.isRequired,
    host_tlog_id: PropTypes.number,
    rating: PropTypes.object.isRequired,
    tlog: PropTypes.object,
    url: PropTypes.string.isRequired,
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
    const { host_tlog_id, tlog } = this.props;
    let authorMeta = '';

    if (tlog != null) {
      if (host_tlog_id == null) {
        authorMeta = tlog.tag;
      } else if (host_tlog_id !== tlog.id) {
        authorMeta = [
          <i className="icon icon--retweet" />,
          tlog.tag,
        ];
      } else {
        return null;
      }
    }

    return (
      <span className="meta-item meta-item--user">
        <span className="meta-item__content">
          <a href={tlog.url}
             title={tlog.tag}
             className="meta-item__link">
            <span className="meta-item__ava">
              <Avatar userpic={tlog.userpic} size={20} />
            </span>
            <span className="meta-item__author">
              {authorMeta}
            </span>
          </a>
        </span>
      </span>
    );
  },
});

export default EntryBrickMetabar;
