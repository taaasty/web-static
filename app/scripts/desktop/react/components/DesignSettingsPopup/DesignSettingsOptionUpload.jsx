/*global i18n */
import React, { PropTypes } from 'react';

function DesignSettingsOptionUpload(props) {
  const {
    backgroundImageEnabled,
    backgroundImageUrl,
    onBgImageChange,
    onImageVisibilityChange,
    optionName,
  } = props;


  function handleVisibilityChange(ev) {
    onImageVisibilityChange(ev.target.checked);
  }

  function handleBgImageChange(ev) {
    const file = ev.target.files[0];

    if (file) {
      onBgImageChange(file);
    }
  }

  return (
    <span>
      <span className="design-settings__text ds-absolute-left ds-fadein-down">
        {i18n.t('design_settings_upload_drag_or')}
        <span className="form-upload form-upload--cover">
          <span className="form-upload__text">
            {i18n.t('design_settings_upload_upload')}
          </span>
          <input
            accept="image/*"
            className="form-upload__input"
            onChange={handleBgImageChange}
            type="file"
          />
        </span>
      </span>
      <span
        className="design-settings__cover ds-absolute-right ds-fadeout-right"
        style={{ backgroundImage: `url("${backgroundImageUrl}")` }}
      />
      <span className="design-settings__text ds-absolute-right ds-fadein-left">
        <span className="form-checkbox">
          <input
            className="form-checkbox__input"
            defaultChecked={backgroundImageEnabled}
            id={optionName}
            onChange={handleVisibilityChange}
            type="checkbox"
          />
          <label
            className="form-checkbox__label"
            htmlFor={optionName}
          >
            <span className="form-checkbox__box">
              <i className="form-checkbox__icon" />
            </span>
            {i18n.t('design_settings_background_enabled')}
          </label>
        </span>
      </span>
    </span>
  );
}

DesignSettingsOptionUpload.propTypes = {
  backgroundImageEnabled: PropTypes.bool.isRequired,
  backgroundImageUrl: PropTypes.string.isRequired,
  onBgImageChange: PropTypes.func.isRequired,
  onImageVisibilityChange: PropTypes.func.isRequired,
  optionName: PropTypes.string.isRequired,
};

export default DesignSettingsOptionUpload;
