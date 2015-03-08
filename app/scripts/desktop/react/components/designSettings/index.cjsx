DesignSettingsDropZone = require './dropZone/index'
DesignSettingsGroups = require './groups/index'
DesignSettingsSaveButton = require './buttons/save'
{ PropTypes } = React

DesignSettings = React.createClass
  displayName: 'DesignSettings'

  propTypes:
    design: PropTypes.object.isRequired
    options: PropTypes.object.isRequired
    onOptionChange: PropTypes.func.isRequired

  render: ->
    <div className="design-settings">
      <DesignSettingsDropZone />
      <div className="design-settings__options">
        <DesignSettingsGroups
            design={ @props.design }
            options={ @props.options }
            onOptionChange={ @props.onOptionChange } />
        <DesignSettingsSaveButton />
      </div>
    </div>

module.exports = DesignSettings