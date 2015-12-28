import React, { PropTypes } from 'react';
import Voting from '../../common/Voting';
import PrivacyBadge from '../../common/PrivacyBadge';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogComments from './EntryTlogComments';
import EntryTlogContentLink from './EntryTlogContentLink';

class EntryTlogQuoteType {
  startComment() {
    this.refs.comments.startComment();
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
  render() {
    const { entry: { is_private, source, text, url }, isInList } = this.props;

    return (
      <span>
        <header className="post__header">
          {this.renderVoting()}
          {is_private && <PrivacyBadge />}
        </header>
        <EntryTlogContentLink show={isInList} url={url}>
          <div className="post__content">
            <blockquote className="blockquote">
              <span className="laquo">«</span>{text}<span className="raquo">»</span>
              {source &&
               <span className="blockquote__caption">—
                 <span className="blockquote__source"> {source}</span>
                </span>
              }
            </blockquote>
          </div>
        </EntryTlogContentLink>
        <div className="post__meta">
          <EntryTlogMetabar {...this.props} onComment={this.startComment.bind(this)} />
        </div>
        {this.renderActions()}
        <EntryTlogComments {...this.props} ref="comments" />
      </span>
    );
  }
}

EntryTlogQuoteType.propTypes = {
  commentator: PropTypes.object,
  entry: PropTypes.object.isRequired,
  hasModeration: PropTypes.bool.isRequired,
  isInList: PropTypes.bool,
};

export default EntryTlogQuoteType;
