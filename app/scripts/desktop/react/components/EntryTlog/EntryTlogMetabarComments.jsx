import React, { PropTypes } from 'react';

function EntryTlogMetabarComments(props) {
  const {
    commentsCount,
    onComment,
  } = props;
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
  commentsCount: PropTypes.number.isRequired,
  onComment: PropTypes.func,
};

export default EntryTlogMetabarComments;
