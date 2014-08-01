window.PostEditor_PersistenceMixin =

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
      data: data
      method: @savingMethod()
      success: (data) =>
        @safeUpdateState => @setState entry: data, type: data.type
        @props.doneCallback data
      error: (data) =>
        TastyNotifyController.errorResponse data
      complete: =>
        @decrementActivities()

React.mixins.add 'PostEditor_PersistenceMixin', [window.PostEditor_PersistenceMixin, window.RequesterMixin]
