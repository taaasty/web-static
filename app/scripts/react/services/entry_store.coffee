STORAGE_PREFIX = 'entries'
window.EntryStore =
  storage: window.localStorage

    # /**
    #  * Получение нормализованных данных Entry
    #  *
    #  * @param {String} entryType - тип Entry
    #  * @param {Object} entry - содержит список уже существующих свойств Entry
    #  * @param {Number} entryId - идентификатор Entry
    #  * @param {String} entryUpdatedAt - дата обновления Entry
    # */

  restoreEntry: (entryType, entryId, entryUpdatedAt) ->
    if entryId && entryUpdatedAt
      @restore @key(entryId, entryUpdatedAt)
    else
      @restore @keyNew()

  storeEntry: (entryId, entryUpdatedAt, normalizedEntry) ->
    if entryId && entryUpdatedAt
      @store @key(entryId, entryUpdatedAt), normalizedEntry
    else
      @store @keyNew(), normalizedEntry

  removeEntry: (entry) ->
    @storage.removeItem @_positionKey(entry)

  store: (key, data) ->
    data.store_at = new Date()
    @storage.setItem key, JSON.stringify(data)

  restore: (key) ->
    JSON.parse @storage.getItem key

  key: (entryId, entryUpdatedAt) ->
    entryUpdatedAt = new Date(entryUpdatedAt).getTime()
    STORAGE_PREFIX + ':' + entryId + ':' + entryUpdatedAt

  keyNew: ->
    STORAGE_PREFIX + ':' + 'new'
