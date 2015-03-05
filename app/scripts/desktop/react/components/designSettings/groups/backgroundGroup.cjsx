DesignSettingsGroup = require './Group'
DesignSettingsOption = require '../Option/index'
DesignSettingsOptionState = require '../Option/State'
DesignSettingsOptionUpload = require '../Option/Upload'
DesignSettingsRadioList = require '../common/RadioList'
{ PropTypes } = React

DesignSettingsBackgroundGroup = React.createClass
  displayName: 'DesignSettingsBackgroundGroup'

  propTypes:
    backgroundColor: PropTypes.string.isRequired
    backgroundImageUrl: PropTypes.string.isRequired
    backgroundImageEnabled: PropTypes.bool.isRequired
    backgroundAlignment: PropTypes.string.isRequired
    backgroundColorItems: PropTypes.array.isRequired
    backgroundAlignmentItems: PropTypes.array.isRequired
    onOptionChange: PropTypes.func.isRequired

  render: ->
    <DesignSettingsGroup title="Фон">
      <DesignSettingsOption
          name={ @props.group.color.optionName }
          title="Цвет">
        <DesignSettingsOptionState style={ @props.group.color.style } />
        <DesignSettingsRadioList
            style={ @props.group.color.style }
            stateName={ @props.group.color.stateName }
            items={ @props.group.color.items }
            className="ds-absolute-left ds-fadein-down"
            onChange={ @props.onOptionChange.bind(null, 'backgroundColor') } />
      </DesignSettingsOption>

      <DesignSettingsOption
          name={ @props.group.image.optionName }
          title="Картинка"
          free={ @props.group.image.free }>
        <DesignSettingsOptionUpload
            stateName={ @props.group.color.stateName }
            value={ @props.group.image.value }
            enabled={ @props.group.image.enabled }
            onVisibilityChange={ @props.onBackgroundVisibilityChange } />
      </DesignSettingsOption>

      <DesignSettingsOption
          name={ @props.group.alignment.optionName }
          title="Выравнивание"
          free={ @props.group.alignment.free }>
        <DesignSettingsRadioList
            style={ @props.group.alignment.style }
            stateName={ @props.group.alignment.stateName }              
            items={ @props.group.alignment.items }
            className="ds-absolute-left ds-fadein-down"
            onChange={ @props.onOptionChange.bind(null, 'backgroundAlignment') } />
      </DesignSettingsOption>
    </DesignSettingsGroup>

module.exports = DesignSettingsBackgroundGroup