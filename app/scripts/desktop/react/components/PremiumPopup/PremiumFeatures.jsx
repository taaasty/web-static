/*global i18n */
import React from 'react';

function PremiumFeatures() {
  return (
    <div className="popup-premium__feature-container">
      <div className="popup-premium__feature">
        <i className="icon icon--badge" />
        {i18n.t('premium_popup.badge')}
      </div>
      <div className="popup-premium__feature">
        <i className="icon icon--people" />
        {i18n.t('premium_popup.rotation')}
      </div>
      <div className="popup-premium__feature">
        <i className="icon icon--drawing" />
        {i18n.t('premium_popup.design')}
      </div>
      <div className="popup-premium__feature">
        <i className="icon icon--alien" />
        {i18n.t('premium_popup.anon_limit')}
      </div>
      <div className="popup-premium__feature">
        <i className="icon icon--pdf" />
        {i18n.t('premium_popup.pdf')}
      </div>
      <div className="popup-premium__feature">
        <i className="icon icon--gift" />
        {i18n.t('premium_popup.gift')}
      </div>
    </div>
  );
}

PremiumFeatures.displayName = 'PremiumFeatures';

export default PremiumFeatures;
