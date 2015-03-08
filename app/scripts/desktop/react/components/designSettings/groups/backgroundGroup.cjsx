DesignSettingsGroup = require './group'
DesignSettingsOption = require '../option/index'
DesignSettingsOptionState = require '../option/state'
DesignSettingsOptionUpload = require '../option/upload'
DesignSettingsRadioList = require '../common/radioList'
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
      <DesignSettingsOption title="Цвет" name="bgcolor">
        <DesignSettingsOptionState style="circlebtn" />
        <DesignSettingsRadioList
            style="circlebtns"
            optionName="backgroundColor"
            value={ @props.backgroundColor }
            items={ @props.backgroundColorItems }
            className="ds-absolute-left ds-fadein-down"
            onChange={ @props.onOptionChange.bind(null, 'backgroundColor') } />
      </DesignSettingsOption>

      <DesignSettingsOption title="Картинка" name="bgimage">
        <DesignSettingsOptionUpload
            optionName="backgroundImage"
            backgroundImageUrl={ @props.backgroundImageUrl }
            backgroundImageEnabled={ @props.backgroundImageEnabled }
            onImageUrlChange={ @props.onOptionChange.bind(null, 'backgroundImageUrl') }
            onImageVisibilityChange={ @props.onOptionChange.bind(null, 'backgroundImageEnabled') } />
      </DesignSettingsOption>

      <DesignSettingsOption title="Выравнивание" name="bgalignment">
        <DesignSettingsRadioList
            style="dotted"
            optionName="backgroundAlignment"
            value={ @props.backgroundAlignment }
            items={ @props.backgroundAlignmentItems }
            className="ds-absolute-left ds-fadein-down"
            onChange={ @props.onOptionChange.bind(null, 'backgroundAlignment') } />
      </DesignSettingsOption>
    </DesignSettingsGroup>

module.exports = DesignSettingsBackgroundGroup