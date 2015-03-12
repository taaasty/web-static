_ = require 'lodash'
DesignStorage = require '../../storages/design'
DesignStatesService = require '../../services/designStates'
DesignSettingsService = require '../../services/designSettings'
DesignSettings = require './index'

DesignSettingsManager = React.createClass
  displayName: 'DesignSettingsManager'

  getInitialState: ->
    design = PersonalDesignSetRepo.get('current').current

    return {
      design: design
      options: DesignStorage
      hasPaidValues: DesignSettingsService.hasPaidValues design
    }

  render: ->
    <DesignSettings
        design={ @state.design }
        options={ @state.options }
        hasPaidValues={ @state.hasPaidValues }
        onOptionChange={ @handleOptionChange }
        onSave={ @handleSave } />

  handleOptionChange: (optionName, value) ->
    newDesign = _.clone @state.design
    newDesign[optionName] = value

    DesignStatesService.apply newDesign
    @setState
      design: newDesign
      hasPaidValues: DesignSettingsService.hasPaidValues newDesign

  handleSave: ->
    console.log 'handleSave'

module.exports = DesignSettingsManager