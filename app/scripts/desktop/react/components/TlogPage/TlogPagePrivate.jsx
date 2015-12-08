/*global i18n */
import React from 'react';

class TlogPagePrivate {
  render() {
    return (
      <div className="content-info">
        <div className="content-info__icon">
          <i className="icon icon--lock" />
        </div>
        <p className="content-info__text">
          {i18n.t('tlog.private')}
        </p>
      </div>
    );
  }
}

export default TlogPagePrivate;
