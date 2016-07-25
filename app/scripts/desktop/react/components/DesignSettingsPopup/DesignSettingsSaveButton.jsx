/*global i18n */
import React, { PropTypes } from 'react';
import Spinner from '../../../../shared/react/components/common/Spinner';

function DesignSettingsSaveButton({ hasPaidValues, isFetching, onClick }) {
  function title() {
    return !hasPaidValues
      ? i18n.t('design_settings_save_button')
      : i18n.t('design_settings_save_with_payment_button');
  }

  return (
    <button className="design-settings__save-button" onClick={onClick}>
      {isFetching ? <Spinner size={14} /> : title()}
    </button>
  );
}

DesignSettingsSaveButton.propTypes = {
  hasPaidValues: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default DesignSettingsSaveButton;
