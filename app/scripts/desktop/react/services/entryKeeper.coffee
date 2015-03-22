NormalizedEntry = require '../entities/normalizedEntry'

STORAGE_PREFIX = 'entries'
storage = localStorage

key: (normalizedEntry) ->
  switch
    when normalizedEntry.id then keyExisting(normalizedEntry.id, normalizedEntry.updatedAt)
    when normalizedEntry.tlogType is 'anonymous' then keyAnonymous()
    else keyNew()

keyNew = ->
  STORAGE_PREFIX + ':new'

keyAnonymous = ->
  STORAGE_PREFIX + ':anonymous'

keyExisting = (entryID, entryUpdatedAt) ->
  time = new Date(entryUpdatedAt).getTime()
  STORAGE_PREFIX + ':' + entryID + ':' + time

EntryKeeper =
  restore: (storageKey) ->
    entryData = JSON.parse storage.getItem(storageKey)
    if entryData? then new NormalizedEntry(entryData) else null

  restoreExistingEntry: (entryID, entryUpdatedAt) ->
    @restore keyExisting(entryID, entryUpdatedAt)

  restoreExistingNewEntry: ->
    @restore keyNew()

  restoreAnonymousEntry: ->
    @restore keyAnonymous()

  store: (normalizedEntry) ->
    storageKey = key normalizedEntry
    storage.setItem storageKey, JSON.stringify(normalizedEntry)

  remove: (normalizedEntry) ->
    storageKey = key normalizedEntry
    storage.removeItem storageKey

module.exports = EntryKeeper