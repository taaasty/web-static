/*global i18n */
import React, { PropTypes } from 'react';
import DesignSettingsGroup from './DesignSettingsGroup';
import DesignSettingsOption from './DesignSettingsOption';
import DesignSettingsOptionState from './DesignSettingsOptionState';
import DesignSettingsOptionUpload from './DesignSettingsOptionUpload';
import DesignSettingsRadioList from './DesignSettingsRadioList';

function DesignSettingsBackgroundGroup(props) {
  const {
    backgroundColor,
    backgroundImageUrl,
    backgroundImageEnabled,
    backgroundAlignment,
    backgroundColorItems,
    backgroundAlignmentItems,
    changeDesignOption,
    onBgImageChange,
  } = props;

  return (
    <DesignSettingsGroup title={i18n.t('design_settings_background_title')}>
      <DesignSettingsOption
        name="bgcolor"
        title={i18n.t('design_settings_background_color_title')}
      >
        <DesignSettingsOptionState style="circlebtn" />
        <DesignSettingsRadioList
          className="ds-absolute-left ds-fadein-down"
          onChange={changeDesignOption.bind(null, 'backgroundColor')}
          optionName="backgroundColor"
          options={backgroundColorItems}
          style="circlebtns"
          value={backgroundColor}
        />
      </DesignSettingsOption>
      <DesignSettingsOption
        name="bgimage"
        title={i18n.t('design_settings_background_image_title')}
      >
        <DesignSettingsOptionUpload
          backgroundImageEnabled={backgroundImageEnabled}
          backgroundImageUrl={backgroundImageUrl}
          onBgImageChange={onBgImageChange}
          onImageVisibilityChange={changeDesignOption.bind(null, 'backgroundImageEnabled')}
          optionName="backgroundImage"
        />
      </DesignSettingsOption>
      <DesignSettingsOption
        name="bgalignment"
        title={i18n.t('design_settings_background_alignment_title')}
      >
        <DesignSettingsRadioList
          className="ds-absolute-left ds-fadein-down"
          onChange={changeDesignOption.bind(null, 'backgroundAlignment')}
          optionName="backgroundAlignment"
          options={backgroundAlignmentItems}
          style="dotted"
          value={backgroundAlignment}
        />
      </DesignSettingsOption>
    </DesignSettingsGroup>
  );
}

DesignSettingsBackgroundGroup.propTypes = {
  backgroundAlignment: PropTypes.string.isRequired,
  backgroundAlignmentItems: PropTypes.object.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  backgroundColorItems: PropTypes.object.isRequired,
  backgroundImageEnabled: PropTypes.bool.isRequired,
  backgroundImageUrl: PropTypes.string.isRequired,
  changeDesignOption: PropTypes.func.isRequired,
  onBgImageChange: PropTypes.func.isRequired,
};

export default DesignSettingsBackgroundGroup;
