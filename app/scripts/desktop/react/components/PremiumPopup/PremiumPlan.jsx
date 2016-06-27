/*global i18n */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Routes from '../../../../shared/routes/routes';
import { PREMIUM_ORDER } from '../../constants/OrderConstants';

function PremiumPlan({ i18nPlanKey, months, recommended }) {
  const containerClasses = classNames({
    'popup-premium__plan': true,
    '--recommended-plan': recommended,
  });
  const offKey = `premium_popup.plans.${i18nPlanKey}.off`;
  const hasOff = i18n.exists(offKey);

  return (
    <div className={containerClasses}>
      {hasOff &&
       <div className="popup-premium__plan-off-container">
         <span className="popup-premium__plan-off">
           {i18n.t(offKey)}
         </span>
       </div>
      }
      <div className="popup-premium__plan-title">
        {i18n.t(`premium_popup.plans.${i18nPlanKey}.title`)}
      </div>
      <div
        className="popup-premium__plan-month-price"
        dangerouslySetInnerHTML={{ __html: i18n.t(`premium_popup.plans.${i18nPlanKey}.month_price`) }}
      />
      {i18n.t('premium_popup.for_month')}
      <div className="popup-premium__plan-year-price">
        {i18n.t(`premium_popup.plans.${i18nPlanKey}.year_price`)}
      </div>
      <div className="popup-premium__plan-footer">
        <form action={Routes.orders()} method="POST">
          <input
            name="type"
            type="hidden"
            value={PREMIUM_ORDER}
          />
          <input
            name="count_months"
            type="hidden"
            value={months}
          />
          <button className="button button--large">
            {i18n.t('premium_popup.buy')}
          </button>
        </form>
      </div>
    </div>
  );
}

PremiumPlan.propTypes = {
  i18nPlanKey: PropTypes.string.isRequired,
  months: PropTypes.number.isRequired,
  recommended: PropTypes.bool,
};

export default PremiumPlan;
