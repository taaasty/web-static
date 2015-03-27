NormalizedEntry = require '../entities/normalizedEntry'

STORAGE_PREFIX = 'entries'
storage = localStorage

key = (normalizedEntry) ->
  switch
    when normalizedEntry.type is 'anonymous' then keyAnonymous()
    when normalizedEntry.id then keyExisting(normalizedEntry.id, normalizedEntry.updatedAt)
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
    # В старой версии редактора мы не хранили тип поста, устанавливаем 'text'
    # если не определено.
    entryData.type ?= 'text'
    if entryData? then new NormalizedEntry(entryData) else null

  restoreExistingEntry: (entryID, entryUpdatedAt) ->
    @restore keyExisting(entryID, entryUpdatedAt)

  restoreExistingNewEntry: ->
    @restore keyNew()

  restoreExistingAnonymousEntry: ->
    @restore keyAnonymous()

  store: (normalizedEntry) ->
    storageKey = key normalizedEntry
    storage.setItem storageKey, JSON.stringify(normalizedEntry)

  remove: (normalizedEntry) ->
    storageKey = key normalizedEntry
    storage.removeItem storageKey

module.exports = EntryKeeper