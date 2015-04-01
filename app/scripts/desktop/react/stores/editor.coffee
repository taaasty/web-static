_ = require 'lodash'
Constants = require '../constants/constants'
BaseStore = require './_base'
EntryNormalizationService = require '../services/entryNormalization'
EntryKeeperService = require '../services/entryKeeper'
NormalizedEntry = require '../entities/normalizedEntry'
AppDispatcher = require '../dispatchers/dispatcher'

_loading = false
_entry = new NormalizedEntry
  type: 'text'
  privacy: 'public'

global.EditorStore = _.extend new BaseStore(),

  getEntry: ->
    _entry

  getEntryID: ->
    _entry.id

  getEntryType: ->
    _entry.type

  getEntryPrivacy: ->
    _entry.privacy

  getEntryImageAttachmentsIDs: ->
    IDs = []
    imageAttachments = @getEntryValue 'imageAttachments'

    _.forEach imageAttachments, (attachment) ->
      IDs.push attachment.id

    IDs

  getEntryValue: (key) ->
    EntryNormalizationService.getNormalizedEntryValue _entry, key

  isLoading: -> _loading

module.exports = EditorStore

EditorStore.dispatchToken = AppDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when Constants.editor.INIT
      { entry, tlogType } = action

      if entry?
        { id, updated_at } = entry

        if tlogType is 'anonymous'
          _entry = (
            EntryKeeperService.restoreExistingAnonymousEntry() ||
            EntryNormalizationService.normalize(entry)
          )
        else
          _entry = (
            EntryKeeperService.restoreExistingEntry(id, updated_at) ||
            EntryNormalizationService.normalize(entry)
          )
      else
        if tlogType is 'anonymous'
          _entry = (
            EntryKeeperService.restoreExistingAnonymousEntry() ||
            new NormalizedEntry
              type: 'anonymous'
              privacy: 'public'
          )
        else
          _entry = (
            EntryKeeperService.restoreExistingNewEntry() ||
            new NormalizedEntry
              type: 'text'
              privacy: if tlogType is 'public' then 'live' else 'public'
          )

      EditorStore.emitChange()

    when Constants.editor.UPDATE_FIELD
      { key, value } = action

      normalizedKey = EntryNormalizationService.getNormalizedKey _entry, key

      if normalizedKey?
        _entry[normalizedKey] = value
        EntryKeeperService.store _entry

      EditorStore.emitChange()

    when Constants.editor.CHANGE_TYPE
      _entry.type = action.entryType

      EditorStore.emitChange()

    when Constants.editor.CHANGE_PRIVACY
      _entry.privacy = action.entryPrivacy
      EntryKeeperService.store _entry

      EditorStore.emitChange()

    when Constants.editor.ENTRY_SAVE_SUCCESS
      EntryKeeperService.remove _entry
      EditorStore.emitChange()

    when Constants.editor.ENTRY_SAVE
      _loading = true
      EditorStore.emitChange()

    when Constants.editor.ENTRY_SAVE_ERROR
      _loading = false
      EditorStore.emitChange()