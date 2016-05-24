import React, { Component, PropTypes } from 'react';
import PrivacyBadge from '../common/PrivacyBadge';
import EntryTlogMetabar from './EntryTlogMetabar';
import EntryTlogActions from './EntryTlogActions';
import EntryTlogComments from './EntryTlogComments';
import EntryTlogContentLink from './EntryTlogContentLink';

class EntryTlogQuoteType extends Component {
  startComment() {
    this.refs.comments.startComment();
  }
  renderActions() {
    if (this.props.hasModeration) {
      return <EntryTlogActions {...this.props} />;
    }
  }
  render() {
    const { entry, isFeed, isInList } = this.props;
    const { is_private, source, text } = entry;

    return (
      <span>
        <header className="post__header">
          {is_private && <PrivacyBadge />}
        </header>
        <EntryTlogContentLink
          entry={entry}
          isFeed={isFeed}
          show={isInList}
        >
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
  isFeed: PropTypes.bool,
  isInList: PropTypes.bool,
};

export default EntryTlogQuoteType;
