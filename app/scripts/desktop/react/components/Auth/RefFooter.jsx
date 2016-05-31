/*global i18n */
import React from 'react';

function RefFooter() {
  return (
    <div className="inviter__stats">
      <div className="inviter__gift-container">
        <span className="inviter__gift-icon">
          <i className="icon icon--gift" />
        </span>
        <span className="inviter__gift-text">
          {i18n.t('inviter.gift_text')}
        </span>
      </div>
    </div>
  );
}

export default RefFooter;
