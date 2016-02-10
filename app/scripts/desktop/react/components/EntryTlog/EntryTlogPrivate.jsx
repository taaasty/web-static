/*global i18n */
import React from 'react';

function EntryTlogPrivate() {
  return (
    <div className="post__content private">
      <div className="content-info__icon">
        <i className="icon icon--lock" />
      </div>      
      <p className="content-info__text">
        {i18n.t('entry.private')}
      </p>
    </div>
  );
}

export default EntryTlogPrivate;
