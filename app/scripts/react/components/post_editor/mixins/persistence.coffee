window.PostEditor_PersistenceMixin =

# activitiesHandler: Object
# doneCallback: function () {
# entry: {
#   text: null
#   title: null
#   type: "text"
# }
# entryPrivacy: "live"
# ref: "editor"

  propTypes:
    entry:        React.PropTypes.object.isRequired
    doneCallback: React.PropTypes.func.isRequired

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
    if @props.entry.id? then 'PUT' else 'POST'

  saveEntry: ({ entryPrivacy }) ->
    @incrementActivities()

    editorData         = @_getEditorData()
    editorData.privacy = entryPrivacy

    @createRequest
      url: @savingUrl()
      data: editorData
      method: @savingMethod()
      success: (newEntry) =>
        console.log newEntry

        @safeUpdateState {
          entry: newEntry
          type:  newEntry.type
        }
        @props.doneCallback newEntry
      error: (data) =>
        TastyNotifyController.errorResponse data
      complete: =>
        @decrementActivities()

React.mixins.add 'PostEditor_PersistenceMixin', [
  window.PostEditor_PersistenceMixin, window.RequesterMixin
  ComponentManipulationsMixin
]