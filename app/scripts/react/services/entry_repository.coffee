STORAGE_PREFIX = 'storeEntries'

window.EntryRepositoryService =
  storage: window.localStorage

  storeNormalizedEntry: (entryId, entryUpdatedAt, normalizedEntry) ->
    # checkt instance of NormalizedEntry
    @_set @_key(entryId, entryUpdatedAt), JSON.stringify(normalizedEntry)

  restoreNormalizedEntry: (entryId, entryUpdatedAt) ->
    @_get @_key(entryId, entryUpdatedAt)

  storeNewNormalizedEntry: (normalizedEntry) ->
    # check noramlizedEntry
    @_set @_key(), normalizedEntry

  restoreNewNormalizedEntry: -> 
    @_get @_key()

  _set: (key, data) ->
    data.store_at = new Date()
    @storage.setItem key, JSON.stringify(data)

  _get: (key) ->
    JSON.parse @storage.getItem key

  _key: (entryId, entryUpdatedAt) ->
    if entryId && entryUpdatedAt
      entryUpdatedAt = new Date(entryUpdatedAt).getTime()

      STORAGE_PREFIX + ':' + entryId + ':' + entryUpdatedAt
    else
      STORAGE_PREFIX + ':' + 'new'