window.PostEditor_PersistenceMixin =

  propTypes:
    entryId:           React.PropTypes.number
    activitiesHandler: React.PropTypes.object.isRequired
    doneCallback:      React.PropTypes.func.isRequired

  savingUrl: ->
    if @props.entryId?
      Routes.api.update_entry_url @props.entryId, @entryType()
    else
      Routes.api.create_entry_url @entryType()

  savingMethod: ->
    if @props.entryId? then 'PUT' else 'POST'

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
        EntryStore.removeEntry(@props.entryId, @props.entryUpdatedAt)
        @props.doneCallback newEntry
      error: (data) =>
        TastyNotifyController.errorResponse data
      complete: =>
        @decrementActivities()

React.mixins.add 'PostEditor_PersistenceMixin', [
  window.PostEditor_PersistenceMixin, window.RequesterMixin
  ComponentManipulationsMixin
]
