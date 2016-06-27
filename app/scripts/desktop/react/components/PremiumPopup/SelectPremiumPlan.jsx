/*global i18n */
import React from 'react';
import PremiumPlan from './PremiumPlan';

function SelectPremiumPlanPopup() {
  return (
    <div>
      <div
        className="popup-premium__title"
        dangerouslySetInnerHTML={{ __html: i18n.t('premium_popup.title') }}
      />
      <div className="popup-premium__description">
        {i18n.t('premium_popup.support_description')}
      </div>
      <div className="popup-premium__plans-container">
        <PremiumPlan i18nPlanKey="month" />
        <PremiumPlan i18nPlanKey="year" recommended />
      </div>
    </div>
  );
}

SelectPremiumPlanPopup.displayName = 'GetPremiumPopup';

export default SelectPremiumPlanPopup;
