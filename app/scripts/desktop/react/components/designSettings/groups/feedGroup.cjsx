DesignSettingsGroup = require './group'
DesignSettingsOption = require '../option/index'
DesignSettingsOptionState = require '../option/State'
DesignSettingsSlider = require '../common/slider'
DesignSettingsRadioList = require '../common/radioList'
DesignSettingsRange = require '../common/range'
{ PropTypes } = React

DesignSettingsFeedGroup = React.createClass
  displayName: 'DesignSettingsFeedGroup'

  propTypes:
    feedBackgroundColor: PropTypes.string.isRequired
    feedFont: PropTypes.string.isRequired
    feedFontColor: PropTypes.string.isRequired
    feedTransparency: PropTypes.number.isRequired
    feedBackgroundColorItems: PropTypes.array.isRequired
    feedFontItems: PropTypes.array.isRequired
    feedFontColorItems: PropTypes.array.isRequired
    onOptionChange: PropTypes.func.isRequired

  render: ->
    <DesignSettingsGroup title="Лента">
      <DesignSettingsOption title="Цвет фона" name="feedbgcolor">
        <DesignSettingsOptionState style="circlebtn" />
        <DesignSettingsRadioList
            style="circlebtns"
            optionName="feedBackgroundColor"
            value={ @props.feedBackgroundColor }
            items={ @props.feedBackgroundColorItems }
            className="ds-absolute-left ds-fadein-down"
            onChange={ @props.onOptionChange.bind(null, 'feedBackgroundColor') } />
      </DesignSettingsOption>

      <DesignSettingsOption title="Шрифт текста" name="feedfont">
        <DesignSettingsOptionState style="font" text="Aa" />
        <DesignSettingsSlider className="ds-fadein-down">
          <DesignSettingsRadioList
              style="font"
              optionName="feedFont"
              value={ @props.feedFont }
              items={ @props.feedFontItems }
              onChange={ @props.onOptionChange.bind(null, 'feedFont') } />
        </DesignSettingsSlider>
      </DesignSettingsOption>

      <DesignSettingsOption title="Цвет текста" name="feedcolor">
        <DesignSettingsOptionState style="circlebtn" />
        <DesignSettingsRadioList
            style="circlebtns"
            optionName="feedFontColor"
            value={ @props.feedFontColor }
            items={ @props.feedFontColorItems }
            className="ds-absolute-left ds-fadein-down"
            onChange={ @props.onOptionChange.bind(null, 'feedFontColor') } />
      </DesignSettingsOption>

      <DesignSettingsOption title="Прозрачность" name="opacity">
        <DesignSettingsRange
            value={ @props.feedTransparency }
            onChange={ @props.onOptionChange.bind(null, 'feedTransparency') } />
      </DesignSettingsOption>
    </DesignSettingsGroup>

module.exports = DesignSettingsFeedGroup