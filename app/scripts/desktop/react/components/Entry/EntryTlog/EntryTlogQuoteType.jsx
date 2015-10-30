import React, { PropTypes } from 'react';
import Voting from '../../common/Voting';
import PrivacyBadge from '../../common/PrivacyBadge';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogComments from './EntryTlogComments';

export default class EntryTlogQuoteType {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    commentator: PropTypes.object,
    hasModeration: PropTypes.bool.isRequired
  }
  render() {
    const { is_private, source, text } = this.props.entry;

    return (
      <span>
        <header className="post__header">
          {this.renderVoting()}
          {is_private && <PrivacyBadge />}
        </header>
        <div className="post__content">
          <blockquote className="blockquote">
            <span className="laquo">«</span>{text}<span className="raquo">»</span>
            {
              source && (
                <span className="blockquote__caption">—
                  <span className="blockquote__source"> {source}</span>
                </span>
              )
            }
          </blockquote>
        </div>
        <div className="post__meta">
          <EntryTlogMetabar {...this.props} onComment={::this.startComment} />
        </div>
        {this.renderActions()}
        <EntryTlogComments {...this.props} ref="comments" />
      </span>
    );
  }
  renderVoting() {
    if (this.props.entry.is_voteable) {
      return (
        <Voting entryID={this.props.entry.id} rating={this.props.entry.rating} />
      );
    }
  }
  renderActions() {
    if (this.props.hasModeration) {
      return <EntryTlogActions {...this.props} />;
    }
  }
  startComment() {
    this.refs.comments.startComment();
  }
}
