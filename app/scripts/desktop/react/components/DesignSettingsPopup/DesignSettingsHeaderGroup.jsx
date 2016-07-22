/*global i18n */
import React, { PropTypes } from 'react';
import DesignSettingsGroup from './DesignSettingsGroup';
import DesignSettingsOption from './DesignSettingsOption';
import DesignSettingsOptionState from './DesignSettingsOptionState';

import DesignSettingsSlider from './DesignSettingsSlider';
import DesignSettingsRadioList from './DesignSettingsRadioList';

function DesignSettingsHeaderGroup(props) {
  const {
    changeDesignOption,
    headerFont,
    headerFontItems,
    headerColor,
    headerColorItems,
    headerSize,
    headerSizeItems,
  } = props;
  
  return (
    <DesignSettingsGroup title={i18n.t('design_settings_header_title')}>
      <DesignSettingsOption
        name="headerfont"
        title={i18n.t('design_settings_header_font_title')}
      >
        <DesignSettingsOptionState style="font" text="Aa" />
        <DesignSettingsSlider className="ds-fadein-down">
          <DesignSettingsRadioList
            items={headerFontItems}
            onChange={changeDesignOption.bind(null, 'headerFont')}
            optionName="headerFont"
            style="font"
            value={headerFont}
          />
        </DesignSettingsSlider>
      </DesignSettingsOption>
      <DesignSettingsOption
        name="headersize"
        title={i18n.t('design_settings_header_size_title')}
      >
        <DesignSettingsRadioList
          className="ds-absolute-left ds-fadein-down"
          items={headerSizeItems}
          onChange={changeDesignOption.bind(null, 'headerSize')}
          optionName="headerSize"
          style="dotted"
          value={headerSize}
        />
      </DesignSettingsOption>
      <DesignSettingsOption
        name="headercolor"
        title={i18n.t('design_settings_header_color_title')}
      >
        <DesignSettingsOptionState style="circlebtn" />
        <DesignSettingsRadioList
          className="ds-absolute-left ds-fadein-down"
          items={headerColorItems}
          onChange={changeDesignOption.bind(null, 'headerColor')}
          optionName="headerColor"
          style="circlebtns"
          value={headerColor}
        />
      </DesignSettingsOption>
    </DesignSettingsGroup>
  );
}

DesignSettingsHeaderGroup.propTypes = {
  changeDesignOption: PropTypes.func.isRequired,
  headerColor: PropTypes.string.isRequired,
  headerColorItems: PropTypes.object.isRequired,
  headerFont: PropTypes.string.isRequired,
  headerFontItems: PropTypes.object.isRequired,
  headerSize: PropTypes.string.isRequired,
  headerSizeItems: PropTypes.object.isRequired,
};

export default DesignSettingsHeaderGroup;
