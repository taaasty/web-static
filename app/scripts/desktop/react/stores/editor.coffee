_ = require 'lodash'
Constants = require '../constants/constants'
BaseStore = require './_base'
EntryNormalizationService = require '../services/entryNormalization'
EntryKeeperService = require '../services/entryKeeper'
NormalizedEntry = require '../entities/normalizedEntry'
AppDispatcher = require '../dispatchers/dispatcher'

_entry = new NormalizedEntry
  type: 'text'
  privacy: 'public'

global.EditorStore = _.extend new BaseStore(),

  getEntry: ->
    _entry

  getEntryType: ->
    _entry.type

  getEntryPrivacy: ->
    _entry.privacy

  getEntryValue: (key) ->
    EntryNormalizationService.getNormalizedEntryValue _entry, key

module.exports = EditorStore

EditorStore.dispatchToken = AppDispatcher.register (payload) ->
  action = payload.action

  switch action.type
    when Constants.editor.INIT
      { entry, tlogType } = action

      if entry?
        { id, updated_at } = entry

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
              privacy: 'anonymous'
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