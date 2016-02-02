import React, { PropTypes } from 'react';

function TlogPagePrivate({ text }) {
  return (
    <div className="content-info">
      <div className="content-info__icon">
        <i className="icon icon--lock" />
      </div>
      <p
        className="content-info__text"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}

TlogPagePrivate.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TlogPagePrivate;
