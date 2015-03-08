_ = require 'lodash'
DesignStorage = require '../../storages/design'
DesignStatesService = require '../../services/designStates'
DesignSettings = require './index'

DesignSettingsManager = React.createClass
  displayName: 'DesignSettingsManager'

  getInitialState: ->
    design: PersonalDesignSetRepo.get('current').current
    options: DesignStorage

  render: ->
    <DesignSettings
        design={ @state.design }
        options={ @state.options }
        onOptionChange={ @handleOptionChange }
        onSave={ @handleSave } />

  handleOptionChange: (optionName, value) ->
    newDesign = _.clone @state.design
    newDesign[optionName] = value

    DesignStatesService.apply newDesign
    @setState(design: newDesign)
    console.log 'handleOptionChange', optionName, value

  handleSave: ->
    console.log 'handleSave'

module.exports = DesignSettingsManager