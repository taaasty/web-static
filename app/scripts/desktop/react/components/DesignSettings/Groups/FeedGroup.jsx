import DesignSettingsGroup from './Group';
import DesignSettingsOption from '../Option/Option';
import DesignSettingsOptionState from '../Option/State';
import DesignSettingsSlider from '../common/slider';
import DesignSettingsRadioList from '../common/radioList';
import DesignSettingsRange from '../common/range';

let DesignSettingsFeedGroup = React.createClass({
  propTypes: {
    feedBackgroundColor: React.PropTypes.string.isRequired,
    feedFont: React.PropTypes.string.isRequired,
    feedFontColor: React.PropTypes.string.isRequired,
    feedTransparency: React.PropTypes.number.isRequired,
    feedBackgroundColorItems: React.PropTypes.array.isRequired,
    feedFontItems: React.PropTypes.array.isRequired,
    feedFontColorItems: React.PropTypes.array.isRequired,
    onOptionChange: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <DesignSettingsGroup title={i18n.t('design_settings_feed_title')}>
        <DesignSettingsOption title={i18n.t('design_settings_feed_color_title')} name="feedbgcolor">
          <DesignSettingsOptionState style="circlebtn" />
          <DesignSettingsRadioList
              style="circlebtns"
              optionName="feedBackgroundColor"
              value={this.props.feedBackgroundColor}
              items={this.props.feedBackgroundColorItems}
              className="ds-absolute-left ds-fadein-down"
              onChange={this.props.onOptionChange.bind(null, 'feedBackgroundColor')} />
        </DesignSettingsOption>

        <DesignSettingsOption title={i18n.t('design_settings_feed_font_title')} name="feedfont">
          <DesignSettingsOptionState style="font" text="Aa" />
          <DesignSettingsSlider className="ds-fadein-down">
            <DesignSettingsRadioList
                style="font"
                optionName="feedFont"
                value={this.props.feedFont}
                items={this.props.feedFontItems}
                onChange={this.props.onOptionChange.bind(null, 'feedFont')} />
          </DesignSettingsSlider>
        </DesignSettingsOption>

        <DesignSettingsOption title={i18n.t('design_settings_feed_font_color_title')} name="feedcolor">
          <DesignSettingsOptionState style="circlebtn" />
          <DesignSettingsRadioList
              style="circlebtns"
              optionName="feedFontColor"
              value={this.props.feedFontColor}
              items={this.props.feedFontColorItems}
              className="ds-absolute-left ds-fadein-down"
              onChange={this.props.onOptionChange.bind(null, 'feedFontColor')} />
        </DesignSettingsOption>

        <DesignSettingsOption title={i18n.t('design_settings_feed_transparency_title')} name="transparency">
          <DesignSettingsRange
              value={this.props.feedTransparency}
              onChange={this.props.onOptionChange.bind(null, 'feedTransparency')} />
        </DesignSettingsOption>
      </DesignSettingsGroup>
    );
  }
});

export default DesignSettingsFeedGroup;