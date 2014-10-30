window.PostEditor_PersistenceMixin =

  propTypes:
    activitiesHandler: React.PropTypes.object.isRequired
    doneCallback:      React.PropTypes.func.isRequired

  entryId: -> @props.normalizedEntry.id

  savingUrl: ->
    if @entryId()?
      ApiRoutes.update_entry_url @entryId(), @entryType()
    else
      ApiRoutes.create_entry_url @entryType()

  savingMethod: ->
    if @entryId()? then 'PUT' else 'POST'

  saveEntry: ({ entryPrivacy }) ->
    @incrementActivities()

    editorData         = @_getEditorData()
    editorData.privacy = entryPrivacy unless entryPrivacy is 'anonymous'

    @createRequest
      url: @savingUrl()
      data: editorData
      method: @savingMethod()
      success: (newEntry) =>
        @safeUpdateState {
          entry: newEntry
          type:  newEntry.type
        }
        EntryStore.removeNormalizedEntry @props.normalizedEntry
        @props.doneCallback newEntry
      error: (data) =>
        TastyNotifyController.errorResponse data
      complete: =>
        @decrementActivities()

React.mixins.add 'PostEditor_PersistenceMixin', [
  window.PostEditor_PersistenceMixin, window.RequesterMixin
  ComponentManipulationsMixin
]