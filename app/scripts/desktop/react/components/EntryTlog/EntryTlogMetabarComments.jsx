/*global i18n */
import React, { PropTypes } from 'react';

function EntryTlogMetabarComments({ commentator, commentsCount, onComment, url }) {
  function numberOfComments() {
    return commentsCount
      ? i18n.t('comments_count', {count: commentsCount})
      : i18n.t('no_comments');
  }

  return (
    <span className="meta-item meta-item_comments">
      <span className="meta__content">
        {commentator
         ? <a
             className="meta-item__common meta__link"
             onClick={onComment}
           >
             {i18n.t('entry_meta_comment_link')}
           </a>
         : <a className="meta-item__common meta__link" href={url}>
             {numberOfComments()}
           </a>
        }
      </span>
    </span>
  );
}

EntryTlogMetabarComments.propTypes = {
  commentator: PropTypes.object,
  commentsCount: PropTypes.number.isRequired,
  onComment: PropTypes.func,
  url: PropTypes.string.isRequired,
};

export default EntryTlogMetabarComments;
