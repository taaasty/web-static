import React, { PropTypes } from 'react';

function TlogPageError({ text }) {
  return (
    <div className="content-info">
      <div className="content-info__icon">
        <i className="icon icon--exclamation-mark" />
      </div>
      <p
        className="content-info__text"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}

TlogPageError.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TlogPageError;
