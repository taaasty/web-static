Api = require '../api/api'
EditorConstants = require('../constants/constants').editor
AppDispatcher = require '../dispatchers/dispatcher'

EditorActionCreators =

  init: ({entry, tlogType}) ->
    AppDispatcher.handleViewAction
      type: EditorConstants.INIT
      entry: entry
      tlogType: tlogType

  updateField: ({key, value}) ->
    AppDispatcher.handleViewAction
      type: EditorConstants.UPDATE_FIELD
      key: key
      value: value

  changeEntryType: (entryType) ->
    AppDispatcher.handleViewAction
      type: EditorConstants.CHANGE_TYPE
      entryType: entryType

  changeEntryPrivacy: (entryPrivacy) ->
    AppDispatcher.handleViewAction
      type: EditorConstants.CHANGE_PRIVACY
      entryPrivacy: entryPrivacy

  createImageAttachments: (formData) ->
    Api.editor.createImageAttachments formData

  createEmbed: (embedUrl) ->
    Api.editor.createEmbed embedUrl

module.exports = EditorActionCreators