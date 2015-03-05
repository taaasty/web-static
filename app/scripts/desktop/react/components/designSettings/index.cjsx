DesignRepo = require '../../repositories/design'
PersonalDesignSetRepo = require '../../repositories/personalDesignSet'
DesignSettingsDropZone = require './dropZone/index'
DesignSettingsGroups = require './groups/index'
# DesignSettingsSaveButton = require './buttons/Save'
# DesignSettingsActions = require '../../actions/designSettings'

DesignSettings = React.createClass
  displayName: 'DesignSettings'
  # mixins: [DesignSettingsMixin]

  getInitialState: ->
    design: PersonalDesignSetRepo.get('current').current
    options: DesignRepo.getAll()

  render: ->
    <div className="design-settings">
      <DesignSettingsDropZone />
      <div className="design-settings__options">
        <DesignSettingsGroups
            design={ @state.design }
            options={ @state.options }
            onOptionChange={ @handleOptionChange } />
        <DesignSettingsSaveButton />
      </div>
    </div>

  handleOptionChange: (option, value) ->
    # DesignSettingsActions.changeOptionValue optionName, value

module.exports = DesignSettings