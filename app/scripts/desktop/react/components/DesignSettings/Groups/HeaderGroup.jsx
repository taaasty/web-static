import DesignSettingsGroup from './Group';
import DesignSettingsOption from '../Option/Option';
import DesignSettingsOptionState from '../Option/State';
import DesignSettingsSlider from '../common/slider';
import DesignSettingsRadioList from '../common/radioList';

let DesignSettingsHeaderGroup = React.createClass({
  propTypes: {
    headerFont: React.PropTypes.string.isRequired,
    headerSize: React.PropTypes.string.isRequired,
    headerColor: React.PropTypes.string.isRequired,
    headerFontItems: React.PropTypes.array.isRequired,
    headerSizeItems: React.PropTypes.array.isRequired,
    headerColorItems: React.PropTypes.array.isRequired,
    onOptionChange: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <DesignSettingsGroup title={i18n.t('design_settings_header_title')}>
        <DesignSettingsOption title={i18n.t('design_settings_header_font_title')} name="headerfont">
          <DesignSettingsOptionState style="font" text="Aa" />
          <DesignSettingsSlider className="ds-fadein-down">
            <DesignSettingsRadioList
                style="font"
                optionName="headerFont"
                value={this.props.headerFont}
                items={this.props.headerFontItems}
                onChange={this.props.onOptionChange.bind(null, 'headerFont')} />
          </DesignSettingsSlider>
        </DesignSettingsOption>

        <DesignSettingsOption title={i18n.t('design_settings_header_size_title')} name="headersize">
          <DesignSettingsRadioList
              style="dotted"
              optionName="headerSize"
              value={this.props.headerSize}
              items={this.props.headerSizeItems}
              className="ds-absolute-left ds-fadein-down"
              onChange={this.props.onOptionChange.bind(null, 'headerSize')} />
        </DesignSettingsOption>

        <DesignSettingsOption title={i18n.t('design_settings_header_color_title')} name="headercolor">
          <DesignSettingsOptionState style="circlebtn" />
          <DesignSettingsRadioList
              style="circlebtns"
              optionName="headerColor"
              value={this.props.headerColor}
              items={this.props.headerColorItems}
              className="ds-absolute-left ds-fadein-down"
              onChange={this.props.onOptionChange.bind(null, 'headerColor')} />
        </DesignSettingsOption>
      </DesignSettingsGroup>
    );
  }
});

export default DesignSettingsHeaderGroup;