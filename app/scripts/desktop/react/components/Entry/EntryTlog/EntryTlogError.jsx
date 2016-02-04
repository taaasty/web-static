import React, { PropTypes } from 'react';

function EntryTlogError({ error }) {
  return (
    <div className="post__content private">
      <div className="content-info__icon">
        <i className="icon icon--exclamation-mark" />
      </div>      
      <p
        className="content-info__text"
        dangerouslySetInnerHTML={{ __html: error }}
      />
    </div>
  );
}

EntryTlogError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default EntryTlogError;
