DesignSettingsDropZone = require './dropZone/index'
DesignSettingsGroups = require './groups/index'
DesignSettingsSaveButton = require './buttons/save'
{ PropTypes } = React

DesignSettings = React.createClass
  displayName: 'DesignSettings'

  propTypes:
    design: PropTypes.object.isRequired
    options: PropTypes.object.isRequired
    hasPaidValues: PropTypes.bool.isRequired
    onOptionChange: PropTypes.func.isRequired
    onSave: PropTypes.func.isRequired

  render: ->
    <div className="design-settings">
      <DesignSettingsDropZone />
      <div className="design-settings__options">
        <DesignSettingsGroups
            design={ @props.design }
            options={ @props.options }
            onOptionChange={ @props.onOptionChange } />
        <DesignSettingsSaveButton
            hasPaidValues={ @props.hasPaidValues }
            onClick={ @props.onSave } />
      </div>
    </div>

module.exports = DesignSettings