/*global i18n */
import React, { PropTypes } from 'react';
import PremiumFeatures from './PremiumFeatures';

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
      <PremiumFeatures />
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
