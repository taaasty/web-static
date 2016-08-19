import React, { PropTypes } from 'react';
import Scroller from '../common/Scroller';
import DesignSettingsHeaderGroup from './DesignSettingsHeaderGroup';
import DesignSettingsBackgroundGroup from './DesignSettingsBackgroundGroup';
import DesignSettingsFeedGroup from './DesignSettingsFeedGroup';
import { List } from 'immutable';

const emptyList = List();

function DesignSettingsGroups(props) {
  const {
    availableOptions: options,
    changeDesignOption,
    design,
    onBgImageChange,
  } = props;

  return (
    <div className="design-settings__groups">
      <Scroller className="scroller--design">
        <DesignSettingsHeaderGroup
          changeDesignOption={changeDesignOption}
          headerColor={design.get('headerColor')}
          headerColorItems={options.get('headerColor', emptyList)}
          headerFont={design.get('headerFont')}
          headerFontItems={options.get('headerFont', emptyList)}
          headerSize={design.get('headerSize')}
          headerSizeItems={options.get('headerSize', emptyList)}
        />
        <DesignSettingsBackgroundGroup
          backgroundAlignment={design.get('backgroundAlignment')}
          backgroundAlignmentItems={options.get('backgroundAlignment', emptyList)}
          backgroundColor={design.get('backgroundColor')}
          backgroundColorItems={options.get('backgroundColor', emptyList)}
          backgroundImageEnabled={design.get('backgroundImageEnabled')}
          backgroundImageUrl={design.get('backgroundImageUrl')}
          changeDesignOption={changeDesignOption}
          onBgImageChange={onBgImageChange}
        />
        <DesignSettingsFeedGroup
          changeDesignOption={changeDesignOption}
          feedBackgroundColor={design.get('feedBackgroundColor')}
          feedBackgroundColorItems={options.get('feedBackgroundColor', emptyList)}
          feedFont={design.get('feedFont')}
          feedFontColor={design.get('feedFontColor')}
          feedFontColorItems={options.get('feedFontColor', emptyList)}
          feedFontItems={options.get('feedFont', emptyList)}
          feedOpacity={design.get('feedOpacity')}
        />
      </Scroller>
    </div>
  );
}

DesignSettingsGroups.propTypes = {
  availableOptions: PropTypes.object.isRequired,
  changeDesignOption: PropTypes.func.isRequired,
  design: PropTypes.object.isRequired,
  onBgImageChange: PropTypes.func.isRequired,
};

export default DesignSettingsGroups;
