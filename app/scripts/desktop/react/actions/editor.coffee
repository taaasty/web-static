_ = require 'lodash'
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

  updateField: (key, value) ->
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

  createImageAttachments: (files) ->
    attachments = EditorStore.getEntryValue('imageAttachments') || []
    newAttachments = attachments[..]
    resolved = false
    dfd = new $.Deferred()

    _.forEach files, (file) =>
      formData = new FormData()
      formData.append 'image', file

      Api.editor.createImageAttachment formData
        .then (imageAttachment) =>
          newAttachments.push imageAttachment
          @updateField 'imageAttachments', newAttachments
          # Ресолвим при успешной загрузке первого аттачмента. Чтобы можно было
          # перейти в режим loaded
          unless resolved
            dfd.resolve()
            resolved = true
        .fail dfd.reject

    dfd.promise()

  deleteImageAttachments: ->
    attachmentsIDs = EditorStore.getEntryImageAttachmentsIDs()

    _.forEach attachmentsIDs, (attachmentID) =>
      Api.editor.deleteImageAttachment attachmentID

    @updateField 'imageAttachments', []

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
        data.image_attachments_ids = EditorStore.getEntryImageAttachmentsIDs()
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