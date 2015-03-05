DesignSettingsGroup = require './Group'
DesignSettingsOption = require '../Option/index'
DesignSettingsOptionState = require '../Option/State'
DesignSettingsSlider = require '../common/Slider'
DesignSettingsRadioList = require '../common/RadioList'
DesignSettingsRange = require '../common/Range'
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
      <DesignSettingsOption
          title="Цвет фона"
          name={ @props.group.bgcolor.optionName }>
        <DesignSettingsOptionState style={ @props.group.bgcolor.itemStyle } />
        <DesignSettingsRadioList
            style={ @props.group.bgcolor.style }
            stateName={ @props.group.bgcolor.stateName }              
            items={ @props.group.bgcolor.items }
            className="ds-absolute-left ds-fadein-down"
            onChange={ @props.onOptionChange.bind(null, 'feedBackgroundColor') } />
      </DesignSettingsOption>

      <DesignSettingsOption
          title="Шрифт текста"
          name={ @props.group.font.optionName }>
        <DesignSettingsOptionState
            style={ @props.group.font.style }
            text="Aa" />
        <DesignSettingsSlider>
          <DesignSettingsRadioList
              style={ @props.group.font.style }
              stateName={ @props.group.font.stateName }              
              items={ @props.group.font.items }
              onChange={ @props.onOptionChange.bind(null, 'feedFont') } />
        </DesignSettingsSlider>
      </DesignSettingsOption>

      <DesignSettingsOption
          title="Цвет текста"
          name={ @props.group.color.optionName }>
        <DesignSettingsOptionState style={ @props.group.color.itemStyle } />
        <DesignSettingsRadioList
            style={ @props.group.color.style }
            stateName={ @props.group.color.stateName }              
            items={ @props.group.color.items }
            className="ds-absolute-left ds-fadein-down"
            onChange={ @props.onOptionChange.bind(null, 'feedColor') } />
      </DesignSettingsOption>

      <DesignSettingsOption
          title="Прозрачность"
          name={ @props.group.opacity.optionName }
          free={ @props.group.opacity.free }>
        <DesignSettingsRange value={ @props.group.opacity.value } />
      </DesignSettingsOption>
    </DesignSettingsGroup>

module.exports = DesignSettingsFeedGroup