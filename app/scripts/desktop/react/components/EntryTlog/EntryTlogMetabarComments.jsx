/*global i18n */
import React, { PropTypes } from 'react';

function EntryTlogMetabarComments({ commentator, commentsCount, onComment, url }) {
  const count = commentsCount || 0;

  return (
    <span className="meta-item meta-item_comments">
      <span className="meta__content">
        <a
          className="meta-item__common meta__link"
          onClick={onComment}
        >
          <i className="icon icon--comments" />
          {count}
        </a>
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
