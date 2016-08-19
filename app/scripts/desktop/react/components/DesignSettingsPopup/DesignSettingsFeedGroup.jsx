/*global i18n */
import React, { PropTypes } from 'react';
import DesignSettingsGroup from './DesignSettingsGroup';
import DesignSettingsOption from './DesignSettingsOption';
import DesignSettingsOptionState from './DesignSettingsOptionState';

import DesignSettingsSlider from './DesignSettingsSlider';
import DesignSettingsRadioList from './DesignSettingsRadioList';
import DesignSettingsRange from './DesignSettingsRange';

function DesignSettingsFeedGroup(props) {
  const {
    changeDesignOption,
    feedBackgroundColor,
    feedBackgroundColorItems,
    feedFont,
    feedFontColor,
    feedFontColorItems,
    feedFontItems,
    feedOpacity,
  } = props;

  return (
    <DesignSettingsGroup title={i18n.t('design_settings_feed_title')}>
      <DesignSettingsOption
        name="feedbgcolor"
        title={i18n.t('design_settings_feed_color_title')}
      >
        <DesignSettingsOptionState style="circlebtn" />
        <DesignSettingsRadioList
          className="ds-absolute-left ds-fadein-down"
          onChange={changeDesignOption.bind(null, 'feedBackgroundColor')}
          optionName="feedBackgroundColor"
          options={feedBackgroundColorItems}
          style="circlebtns"
          value={feedBackgroundColor}
        />
      </DesignSettingsOption>
      <DesignSettingsOption
        name="feedfont"
        title={i18n.t('design_settings_feed_font_title')}
      >
        <DesignSettingsOptionState style="font" text="Aa" />
        <DesignSettingsSlider className="ds-fadein-down">
          <DesignSettingsRadioList
            onChange={changeDesignOption.bind(null, 'feedFont')}
            optionName="feedFont"
            options={feedFontItems}
            style="font"
            value={feedFont}
          />
        </DesignSettingsSlider>
      </DesignSettingsOption>
      <DesignSettingsOption
        name="feedcolor"
        title={i18n.t('design_settings_feed_font_color_title')}
      >
        <DesignSettingsOptionState style="circlebtn" />
        <DesignSettingsRadioList
          className="ds-absolute-left ds-fadein-down"
          onChange={changeDesignOption.bind(null, 'feedFontColor')}
          optionName="feedFontColor"
          options={feedFontColorItems}
          style="circlebtns"
          value={feedFontColor}
        />
      </DesignSettingsOption>
      <DesignSettingsOption
        name="opacity"
        title={i18n.t('design_settings_feed_opacity_title')}
      >
        <DesignSettingsRange
          onChange={changeDesignOption.bind(null, 'feedOpacity')}
          value={feedOpacity}
        />
      </DesignSettingsOption>
    </DesignSettingsGroup>
  );
}

DesignSettingsFeedGroup.propTypes = {
  changeDesignOption: PropTypes.func.isRequired,
  feedBackgroundColor: PropTypes.string.isRequired,
  feedBackgroundColorItems: PropTypes.object.isRequired,
  feedFont: PropTypes.string.isRequired,
  feedFontColor: PropTypes.string.isRequired,
  feedFontColorItems: PropTypes.object.isRequired,
  feedFontItems: PropTypes.object.isRequired,
  feedOpacity: PropTypes.number.isRequired,
};

export default DesignSettingsFeedGroup;
