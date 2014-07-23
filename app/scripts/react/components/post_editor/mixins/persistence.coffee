window.PostEditor_PersistenceMixin =
  propTypes:
    entry:             React.PropTypes.object.isRequired
    activitiesHandler: React.PropTypes.object.isRequired
    doneCallback:      React.PropTypes.func.isRequired

  savingUrl: ->
    if @props.entry.id?
      Routes.api.update_entry_url @props.entry
    else
      Routes.api.create_entry_url @props.entry.type

  savingMethod: ->
    if @props.entry.id?
      'PUT'
    else
      'POST'

  saveEntry: ->
    @incrementAcitivities()
    $.ajax
      url:     @savingUrl()
      method:  @savingMethod()
      data:    @data()
      success: (data) =>
        @setState entry: data, type: data.type
        @props.doneCallback data
      error:   (data) =>
        console.log 'error'
        TastyNotifyController.errorResponse data
      complete: =>
        console.log 'complete'
        @decrementAcitivities()

