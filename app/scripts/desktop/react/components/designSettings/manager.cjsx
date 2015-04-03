_ = require 'lodash'
CurrentUserStore = require '../../stores/current_user'
DesignOptionsModel = require '../../models/designOptions'
DesignPreviewService = require '../../services/designPreview'
DesignOptionsService = require '../../services/designOptions'
DesignActionCreators = require '../../actions/design'
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

  componentWillUnmount: ->
    # Если вдруг закрыли попап, то возвращаем последнее сохранённое значение
    currentDesign = PersonalDesignSetRepo.get('current').current
    DesignPreviewService.apply currentDesign

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
    if @state.hasPaidValues && !@state.hasDesignBundle
      PopupActions.showDesignSettingsPayment()
    else
      DesignActionCreators.saveDesign(@state.design, CurrentUserStore.getUser().id)
        .then (design) =>
          PersonalDesignSetRepo.set 'current', design
          @setState({design})

module.exports = DesignSettingsManager