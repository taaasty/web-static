import React, { PropTypes } from 'react';
import EntryTlogCommentForm from './EntryTlogCommentForm';

function EntryTlogCommentEditForm({ commentHtml, commentator, onCancel, onCommentUpdate, process }) {
  return (
    <EntryTlogCommentForm
      commentator={commentator}
      onCancel={onCancel}
      onSubmit={onCommentUpdate}
      process={process}
      text={commentHtml}
    />
  );
}

EntryTlogCommentEditForm.propTypes = {
  commentHtml: PropTypes.string,
  commentator: PropTypes.object.isRequired,
  process: PropTypes.bool,
};

export default EntryTlogCommentEditForm;
