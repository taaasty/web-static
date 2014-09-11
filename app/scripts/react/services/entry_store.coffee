#DEFAULT_ENTRIES =
  #text:
    #type: 'text'
    #title: null
    #text:  null
  #image:
    #type: 'image'
    #title:     null
    #image_url: null
    #image_attachments: []
  #instagram:
    #type: 'video'
    #title: null
  #music:
    #type: 'video'
    #title: null
  #video:
    #type: 'video'
    #title: null
    #video_url: null
  #quote:
    #type: 'quote'
    #text: null
    #source: null

window.EntryStore =

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
      EntryRepositoryService.restoreNormalizedEntry(entryId, entryUpdatedAt)
    else
      EntryRepositoryService.restoreNewNormalizedEntry()

  storeEntry: (entryId, entryUpdatedAt, normalizedEntry) ->
    if entryId && entryUpdatedAt
      EntryRepositoryService.storeNormalizedEntry(entryId, entryUpdatedAt, normalizedEntry)
    else
      EntryRepositoryService.storeNewNormalizedEntry(normalizedEntry)

  removeEntry: (entry) ->
    @storage.removeItem @_positionKey(entry)
