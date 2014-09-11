DEFAULT_ENTRIES =
  text:
    type: 'text'
    title: null
    text:  null
  image:
    type: 'image'
    title:     null
    image_url: null
    image_attachments: []
  instagram:
    type: 'video'
    title: null
  music:
    type: 'video'
    title: null
  video:
    type: 'video'
    title: null
    video_url: null
  quote:
    type: 'quote'
    text: null
    source: null

window.EntryStoreService =

  restoreEntry: (entryType, entry, entryId, entryUpdatedAt) ->
    # /**
    #  * Получение нормализованных данных Entry
    #  *
    #  * @param {String} entryType - тип Entry
    #  * @param {Object} entry - содержит список уже существующих свойств Entry
    #  * @param {Number} entryId - идентификатор Entry
    #  * @param {String} entryUpdatedAt - дата обновления Entry
    # */

    if entryId && entryUpdatedAt
      normalizedEntry = EntryRepositoryService.restoreNormalizedEntry(entryId, entryUpdatedAt)

      unless normalizeEntry?
        denormalizedEntry = EntryNormalizationService.denormalize(entry, entryType)
    else
      normalizedEntry = EntryRepositoryService.restoreNewNormalizedEntry()

      unless normalizeEntry?
        denormalizedEntry = EntryNormalizationService.denormalize(DEFAULT_ENTRIES[entryType], entryType)

    if normalizedEntry?
      denormalizedEntry = EntryNormalizationService.denormalize(normalizedEntry, entryType)

    denormalizedEntry.id         = entryId
    denormalizedEntry.updated_at = entryUpdatedAt

    denormalizedEntry

  storeEntry: (entryId, entryUpdatedAt, normalizedEntry) ->
    if entryId && entryUpdatedAt
      EntryRepositoryService.storeNormalizedEntry(entryId, entryUpdatedAt, normalizedEntry)
    else
      EntryRepositoryService.storeNewNormalizedEntry(normalizedEntry)

  removeEntry: (entry) ->
    @storage.removeItem @_positionKey(entry)