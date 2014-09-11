window.PostEditor_PersistenceMixin =

  propTypes:
    activitiesHandler: React.PropTypes.object.isRequired
    doneCallback:      React.PropTypes.func.isRequired

  savingUrl: ->
    if @entryId()?
      Routes.api.update_entry_url @entryId(), @entryType()
    else
      Routes.api.create_entry_url @entryType()

  entryId:  ->
    @props.normalizedEntry.id

  savingMethod: ->
    if @entryId()? then 'PUT' else 'POST'

  saveEntry: ({ entryPrivacy }) ->
    @incrementActivities()

    editorData         = @_getEditorData()
    editorData.privacy = entryPrivacy

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
