/*global i18n */
import React, { PropTypes } from 'react';

function PremiumPopup({ close }) {
  return (
    <div className="">
      <div
        className="popup-premium__title"
        dangerouslySetInnerHTML={{ __html: i18n.t('premium_popup.title') }}
      />
      <div className="popup-premium__description">
        {i18n.t('premium_popup.description')}
      </div>
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
      <div className="popup-premium__footer">
        <span className="button button--large button--green" onClick={close}>
          {i18n.t('premium_popup.thank_you')}
        </span>
      </div>
    </div>
  );
}

PremiumPopup.displayName = 'PremiumPopup';

PremiumPopup.propTypes = {
  close: PropTypes.func.isRequired,
};

export default PremiumPopup;
