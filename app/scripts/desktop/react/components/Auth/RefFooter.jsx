/*global i18n */
import React, { PropTypes } from 'react';

function RefFooter({ userName }) {
  return (
    <div className="inviter__stats">
      <div className="inviter__gift-container">
        <span className="inviter__gift-icon">
          <i className="icon icon--gift" />
        </span>
        <span className="inviter__gift-text">
          {i18n.t('inviter.gift_text', { context: !!userName ? 'from' : 'empty', userName })}
        </span>
      </div>
    </div>
  );
}

RefFooter.propTypes = {
  userName: PropTypes.string,
};

export default RefFooter;
