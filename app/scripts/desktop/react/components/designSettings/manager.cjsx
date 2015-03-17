_ = require 'lodash'
CurrentUserStore = require '../../stores/current_user'
DesignOptionsModel = require '../../models/designOptions'
DesignPreviewService = require '../../services/designPreview'
DesignOptionsService = require '../../services/designOptions'
PopupActions = require '../../actions/popup'
DesignSettings = require './index'

DesignSettingsManager = React.createClass
  displayName: 'DesignSettingsManager'

  getInitialState: ->
    design = PersonalDesignSetRepo.get('current').current

    return {
      design: design
      options: DesignOptionsModel
      hasDesignBundle: CurrentUserStore.hasDesignBundle()
      hasPaidValues: DesignOptionsService.hasPaidValues design
    }

  render: ->
    <DesignSettings {...@state}
        onOptionChange={ @handleOptionChange }
        onSave={ @handleSave } />

  handleOptionChange: (optionName, value) ->
    newDesign = _.clone @state.design
    newDesign[optionName] = value

    DesignPreviewService.apply newDesign
    @setState
      design: newDesign
      hasPaidValues: DesignOptionsService.hasPaidValues newDesign

  handleSave: ->
    if @state.hasPaidValues
      PopupActions.showDesignSettingsPayment()
    else
      console.log 'save settings', @state.design

module.exports = DesignSettingsManager