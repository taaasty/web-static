import Scroller from '../../common/Scroller';
import DesignSettingsHeaderGroup from './HeaderGroup';
import DesignSettingsBackgroundGroup from './BackgroundGroup';
import DesignSettingsFeedGroup from './FeedGroup';

let DesignSettingsGroups = React.createClass({
  propTypes: {
    design: React.PropTypes.object.isRequired,
    options: React.PropTypes.object.isRequired,
    onOptionChange: React.PropTypes.func.isRequired,
    onBgImageChange: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="design-settings__groups">
        <Scroller className="scroller--design">
          <DesignSettingsHeaderGroup
              headerFont={this.props.design.headerFont}
              headerSize={this.props.design.headerSize}
              headerColor={this.props.design.headerColor}
              headerFontItems={this.props.options.headerFont}
              headerSizeItems={this.props.options.headerSize}
              headerColorItems={this.props.options.headerColor}
              onOptionChange={this.props.onOptionChange} />
          <DesignSettingsBackgroundGroup
              backgroundColor={this.props.design.backgroundColor}
              backgroundImageUrl={this.props.design.backgroundImageUrl}
              backgroundImageEnabled={this.props.design.backgroundImageEnabled}
              backgroundAlignment={this.props.design.backgroundAlignment}
              backgroundColorItems={this.props.options.backgroundColor}
              backgroundAlignmentItems={this.props.options.backgroundAlignment}
              onOptionChange={this.props.onOptionChange}
              onBgImageChange={this.props.onBgImageChange} />
          <DesignSettingsFeedGroup
              feedBackgroundColor={this.props.design.feedBackgroundColor}
              feedFont={this.props.design.feedFont}
              feedFontColor={this.props.design.feedFontColor}
              feedOpacity={this.props.design.feedOpacity}
              feedBackgroundColorItems={this.props.options.feedBackgroundColor}
              feedFontItems={this.props.options.feedFont}
              feedFontColorItems={this.props.options.feedFontColor}
              onOptionChange={this.props.onOptionChange} />
        </Scroller>
      </div>
    );
  }
});

export default DesignSettingsGroups;
