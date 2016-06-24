/*global i18n */
import React, { PropTypes } from 'react';
import PremiumFeatures from './PremiumFeatures';
import Routes from '../../../../shared/routes/routes';
import { PREMIUM_ORDER } from '../../constants/OrderConstants';

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
        <form action={Routes.orders()} method="POST">
          <input
            name="type"
            type="hidden"
            value={PREMIUM_ORDER}
          />
          <input
            name="count_months"
            type="hidden"
            value={12}
          />
          <button className="button button--large button--green">
            {i18n.t('premium_popup.get_premium')}
          </button>
          <div className="popup-premium__footer-description">
            {i18n.t('premium_popup.year_price')}
          </div>
        </form>
      </div>
    </div>
  );
}

GetPremiumPopup.displayName = 'GetPremiumPopup';

GetPremiumPopup.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GetPremiumPopup;
