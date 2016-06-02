/*global i18n */
import React, { PropTypes } from 'react';
import PremiumFeatures from './PremiumFeatures';

function GetPremiumPopup({ onClick }) {
  return (
    <div>
      <div
        className="popup-premium__title"
        dangerouslySetInnerHTML={{ __html: i18n.t('premium_popup.title') }}
      />
      <div className="popup-premium__description">
        {i18n.t('premium_popup.support_description')}
      </div>
      <PremiumFeatures />
      <div className="popup-premium__footer">
        <span className="button button--large button--green" onClick={onClick}>
          {i18n.t('premium_popup.get_premium')}
        </span>
      </div>
    </div>
  );
}

GetPremiumPopup.displayName = 'GetPremiumPopup';

GetPremiumPopup.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GetPremiumPopup;
