window.PostEditor_PersistenceMixin =
  mixins: [RequesterMixin]

  propTypes:
    entry:             React.PropTypes.object.isRequired
    activitiesHandler: React.PropTypes.object.isRequired
    doneCallback:      React.PropTypes.func.isRequired
    onChanging:        React.PropTypes.func.isRequired

  getChangeCallback: (field) ->
    changed = (field, content) ->
      @props.entry[field] = content

    return changed.bind @, field

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

  saveEntry: ({entryPrivacy}) ->
    @incrementActivities()
    data = @data()
    data.privacy = entryPrivacy

    @createRequest
      url: @savingUrl()
      success: (data) =>
        @safeUpdateState => @setState entry: data, type: data.type
        @props.doneCallback data
      error: (data) =>
        console.log 'error'
        TastyNotifyController.errorResponse data
      complete: =>
        console.log 'complete'
        @decrementActivities()