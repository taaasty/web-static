/*global i18n */
import React, { PropTypes } from 'react';
import EntryTlogCommentMetabarDate from './EntryTlogCommentMetabarDate';
import EntryTlogCommentMetabarActions from './EntryTlogCommentMetabarActions';

class EntryTlogCommentMetabar {
  renderReply() {
    const { commentator, onCommentReply } = this.props;

    if (commentator) {
      return (
        <span>
          <span className="comment__reply" onClick={onCommentReply}>
            {i18n.t('comment_reply')}
          </span>
          <span className="comment__dot">·</span>
        </span>
      );
    }
  }
  render() {
    const { comment: { created_at, id }, entryUrl } = this.props;
    const commentUrl = `${entryUrl}#comment-${id}`;

    return (
      <span className="comment__meta">
        {this.renderReply()}
        <EntryTlogCommentMetabarDate
          date={created_at}
          url={commentUrl}
        />
        <span className="comment__dot">·</span>
        <EntryTlogCommentMetabarActions {...this.props} url={commentUrl} />
      </span>
    );
  }
}

EntryTlogCommentMetabar.propTypes = {
  comment: PropTypes.object.isRequired,
  commentator: PropTypes.object,
  entryUrl: PropTypes.string.isRequired,
};

export default EntryTlogCommentMetabar;
