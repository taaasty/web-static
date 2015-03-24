Api = require '../api/api'
EditorConstants = require('../constants/constants').editor
EditorStore = require '../stores/editor'
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

  saveEntry: ->
    data = {}
    entryID = EditorStore.getEntryID()
    entryType = EditorStore.getEntryType()
    # Сохраняем Video, Instagram и Music в video точке
    entryType = 'video' if entryType is 'music' or entryType is 'instagram'

    onSuccess = (entry) ->
      if TastySettings.env is 'static-development'
        alert "Статья #{ entry.id } успешно сохранена"
      else
        TastyNotifyController.notifySuccess i18n.t 'editor_create_success'
        window.location.href = entry.entry_url

      AppDispatcher.handleServerAction
        type: EditorConstants.ENTRY_SAVED

    switch entryType
      when 'text'
        data.title = EditorStore.getEntryValue 'title'
        data.text = EditorStore.getEntryValue 'text'
        data.privacy = EditorStore.getEntryPrivacy()
      when 'anonymous'
        data.title = EditorStore.getEntryValue 'title'
        data.text = EditorStore.getEntryValue 'text'
      when 'image'
        data.title = EditorStore.getEntryValue 'title'
        data.image_url = EditorStore.getEntryValue 'imageUrl'
        data.privacy = EditorStore.getEntryPrivacy()
        #TODO: data.image_attachments = [1,5,8...]
      when 'instagram', 'music', 'video'
        data.title = EditorStore.getEntryValue 'title'
        data.video_url = EditorStore.getEntryValue 'embedUrl'
        data.privacy = EditorStore.getEntryPrivacy()
      when 'quote'
        data.text = EditorStore.getEntryValue 'text'
        data.source = EditorStore.getEntryValue 'source'
        data.privacy = EditorStore.getEntryPrivacy()

    if entryID
      url = ApiRoutes.update_entry_url entryID, entryType
      Api.editor.updateEntry url, data
        .then onSuccess
    else
      url = ApiRoutes.create_entry_url entryType
      Api.editor.createEntry url, data
        .then onSuccess

module.exports = EditorActionCreators