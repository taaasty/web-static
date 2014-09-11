STORAGE_PREFIX = 'storeEntries'

window.EntryRepositoryService =
  storage: window.localStorage

  storeNormalizedEntry: (entryId, entryUpdatedAt, normalizedEntry) ->
    @storage.setItem @_getEntryStorageKey(entryId, entryUpdatedAt), JSON.stringify(normalizedEntry)

  restoreNormalizedEntry: (entryId, entryUpdatedAt) ->
    entryUpdatedAt = new Date(entryUpdatedAt).getTime()

    @_getEntryData( entryId, entryUpdatedAt )

  storeNewNormalizedEntry: (normalizedEntry) ->
    @storage.setItem @_getEntryStorageKey(), JSON.stringify(normalizedEntry)

  restoreNewNormalizedEntry: -> @_getEntryData()

  _getEntryData: (entryId, entryUpdatedAt) ->
    entryStorageKey = @_getEntryStorageKey entryId, entryUpdatedAt

    @_getEntryDataByStorageKey entryStorageKey

  _getEntryDataByStorageKey: (entryStorageKey) ->
    JSON.parse @storage.getItem entryStorageKey

  _getEntryStorageKey: (entryId, entryUpdatedAt) ->
    if entryId && entryUpdatedAt
      STORAGE_PREFIX + ':' + entryId + ':' + entryUpdatedAt
    else
      STORAGE_PREFIX + ':' + 'new'