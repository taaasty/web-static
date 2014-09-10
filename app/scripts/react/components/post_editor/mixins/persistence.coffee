window.PostEditor_PersistenceMixin =

  propTypes:
    entryId:           React.PropTypes.number
    entryType:         React.PropTypes.string.isRequired
    activitiesHandler: React.PropTypes.object.isRequired
    doneCallback:      React.PropTypes.func.isRequired

  savingUrl: ->
    if @props.entryId?
      Routes.api.update_entry_url @props.entryId, @props.entryType
    else
      Routes.api.create_entry_url @props.entryType

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
        EntryStoreService.removeEntry()
        @props.doneCallback newEntry
      error: (data) =>
        TastyNotifyController.errorResponse data
      complete: =>
        @decrementActivities()

React.mixins.add 'PostEditor_PersistenceMixin', [
  window.PostEditor_PersistenceMixin, window.RequesterMixin
  ComponentManipulationsMixin
]