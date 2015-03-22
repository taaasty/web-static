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
        _entry = (
          EntryKeeperService.restoreExistingNewEntry() ||
          new NormalizedEntry
            type: 'text'
            privacy: if tlogType is 'public' then 'live' else 'public'
        )

      EditorStore.emitChange()