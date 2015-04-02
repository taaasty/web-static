_ = require 'lodash'
Api = require '../api/api'
EditorConstants = require('../constants/constants').editor
EditorStore = require '../stores/editor'
AppDispatcher = require '../dispatchers/dispatcher'
UuidService = require '../../../shared/react/services/uuid'
ApiHelpers = require '../../../shared/helpers/api'
BrowserHelpers = require '../../../shared/helpers/browser'

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

  changeTitle: (title) ->
    @updateField 'title', title

  changeText: (text) ->
    @updateField 'text', text

  changeImageUrl: (imageUrl) ->
    @updateField 'imageUrl', imageUrl

  changeEmbedUrl: (embedUrl) ->
    @updateField 'embedUrl', embedUrl

  changeEmbedHtml: (embedHtml) ->
    @updateField 'embedHtml', embedHtml

  changeSource: (source) ->
    @updateField 'source', source

  createImageAttachments: (files) ->
    promises = []

    _.forEach files, (file) =>
      # Общий uuid для imageAttachment-like blob и imageAttachment
      uuid = UuidService.generate()
      uploadFailed = false

      # Добавляем imageAttachment-like blob объект, назначаем ему uuid
      image = new Image()
      image.onload = =>
        attachments = EditorStore.getEntryValue('imageAttachments') || []
        newAttachments = attachments[..]
        blobAttachment =
          uuid: uuid
          image:
            geometry:
              width: image.width
              height: image.height
            url: image.src

        newAttachments.push blobAttachment
        unless uploadFailed
          @updateField 'imageAttachments', newAttachments
      image.src = BrowserHelpers.createObjectURL file

      # Делаем запрос на создание картинки, на успешный ответ заменяем blob с uuid
      formData = new FormData()
      formData.append 'image', file

      promise = Api.editor.createImageAttachment(formData)
        .then (imageAttachment) =>
          attachments = EditorStore.getEntryValue('imageAttachments') || []
          newAttachments = attachments[..]

          blobIndex = _.findIndex newAttachments, (attachment) ->
            attachment.uuid == uuid

          if blobIndex == -1
            newAttachments.push imageAttachment
          else
            newAttachments[blobIndex] = imageAttachment

          @updateField 'imageAttachments', newAttachments
        .fail (xhr) =>
          attachments = EditorStore.getEntryValue('imageAttachments') || []
          newAttachments = attachments[..]
          uploadFailed = true

          blobIndex = _.findIndex newAttachments, (attachment) ->
            attachment.uuid == uuid

          TastyNotifyController.notifyError i18n.t('editor_attachment_error', fileName: file.name)
          newAttachments.splice blobIndex, 1 unless blobIndex == -1
          @updateField 'imageAttachments', newAttachments

      promises.push promise

    AppDispatcher.handleServerAction
      type: EditorConstants.ENTRY_CREATING_ATTACHMENTS_START

    ApiHelpers.settle promises
      .always ->
        AppDispatcher.handleServerAction
          type: EditorConstants.ENTRY_CREATING_ATTACHMENTS_END

  deleteEmbedUrl: ->
    @changeEmbedUrl null

  deleteEmbedHtml: ->
    @changeEmbedHtml null

  deleteImageUrl: ->
    @changeImageUrl null

  deleteImageAttachments: ->
    attachments = EditorStore.getEntryValue 'imageAttachments'

    _.forEach attachments, (attachment) =>
      if not attachment.entry_id and attachment.id
        Api.editor.deleteImageAttachment attachment.id

    @updateField 'imageAttachments', []

  createEmbed: (embedUrl) ->
    Api.editor.createEmbed embedUrl

  saveEntry: ->
    data = {}
    entryID = EditorStore.getEntryID()
    entryType = EditorStore.getEntryType()
    # Сохраняем Video, Instagram и Music в video точке
    entryType = 'video' if entryType is 'music' or entryType is 'instagram'

    AppDispatcher.handleServerAction
      type: EditorConstants.ENTRY_SAVE

    onSuccessCreate = (entry) ->
      AppDispatcher.handleServerAction
        type: EditorConstants.ENTRY_SAVE_SUCCESS

      TastyLockingAlertController.show
        title: i18n.t 'editor_alert_header'
        message: i18n.t 'editor_create_success'
        action: -> window.location = entry.entry_url

    onSuccessEdit = (entry) ->
      AppDispatcher.handleServerAction
        type: EditorConstants.ENTRY_SAVE_SUCCESS

      TastyLockingAlertController.show
        title: i18n.t 'editor_alert_header'
        message: i18n.t 'editor_edit_success'
        action: -> window.location = entry.entry_url

    onFail = (xhr) ->
      AppDispatcher.handleServerAction
        type: EditorConstants.ENTRY_SAVE_ERROR

      TastyNotifyController.errorResponse xhr

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
        imageAttachmentsIDs = EditorStore.getEntryImageAttachmentsIDs()
        data.image_attachments_ids = if imageAttachmentsIDs.length then imageAttachmentsIDs else ['']
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
        .then onSuccessEdit
        .fail onFail
    else
      url = ApiRoutes.create_entry_url entryType
      Api.editor.createEntry url, data
        .then onSuccessCreate
        .fail onFail

module.exports = EditorActionCreators