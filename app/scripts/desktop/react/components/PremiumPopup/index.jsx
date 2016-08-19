/*global i18n */
import React, { PropTypes } from 'react';
import PremiumFeatures from './PremiumFeatures';
import PopupArea from '../Popup/Area';
import Popup from '../Popup';

function PremiumPopup({ onClose }) {
  return (
    <PopupArea onClose={onClose}>
      <Popup
        className="popup--premium popup--dark"
        clue="premiumPopup"
        onClose={onClose}
        title=""
      >
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
            <span className="button button--large button--green" onClick={onClose}>
              {i18n.t('premium_popup.thank_you')}
            </span>
          </div>
        </div>
      </Popup>
    </PopupArea>
  );
}

PremiumPopup.displayName = 'PremiumPopup';

PremiumPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PremiumPopup;
