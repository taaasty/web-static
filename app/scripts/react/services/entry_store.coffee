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
    title:     null
    video_url: null
  quote:
    type: 'quote'
    text:   null
    source: null

STORAGE_PREFIX = 'storeEntries'

window.EntryStoreService =
  storage: window.localStorage

  storeEntry: (entry) ->
    entryData = @_getEntryData entry

    switch entry.type
      when 'text'
        entryData.title = entry.title
        entryData.text  = entry.text
      when 'image'
        entryData.text              = entry.title
        entryData.image_url         = entry.image_url
        entryData.image_attachments = []
        # entryData.image_attachments = @_encodeImageAttachments(entry.image_attachments)
      when 'instagram'
        entryData.text      = entry.title
        entryData.embedHtml = entry.embedHtml
        entryData.video_url = entry.video_url
      when 'music'
        entryData.text      = entry.title
        entryData.embedHtml = entry.embedHtml
        entryData.video_url = entry.video_url
      when 'video'
        entryData.text      = entry.title
        entryData.embedHtml = entry.embedHtml
        entryData.video_url = entry.video_url
      when 'quote'
        entryData.title = entry.source
        entryData.text  = entry.text
      else
        console.error 'Невозможно сохранить пост, неивестный тип поста', entry.type

    @storage.setItem @_positionKey(entry), JSON.stringify(entryData)

  restoreEntry: (type, entry) ->
    entryData = @_getEntryData( entry ) || DEFAULT_ENTRIES[type]

    switch type
      when 'text'
        entryData = {
          type:  'text'
          title: entryData.title
          text:  entryData.text
        }
      when 'image'
        entryData = {
          type:              'image'
          title:             entryData.text
          image_url:         entryData.image_url
          image_attachments: entry.image_attachments
          # image_attachments: @_decodeImageAttachments(entryData.image_attachments || [])
        }
      when 'instagram'
        entryData = {
          type:      'instagram'
          title:     entryData.text
          embedHtml: entryData.embedHtml
          video_url: entryData.video_url
        }
      when 'music'
        entryData = {
          type:      'music'
          title:     entryData.text
          embedHtml: entryData.embedHtml
          video_url: entryData.video_url
        }
      when 'video'
        entryData = {
          type:      'video'
          title:     entryData.text
          embedHtml: entryData.embedHtml
          video_url: entryData.video_url
        }
      when 'quote'
        entryData = {
          type:   'quote'
          text:   entryData.text
          source: entryData.title
        }
      else
        console.error 'Невозможно восстановить пост, неивестный тип поста', data.type

    #entryData.id         = entry.id
    #entryData.updated_at = new Date(entry.updated_at).getTime()

    entryData

  removeEntry: (entry) ->
    @storage.removeItem @_positionKey(entry)

  _getEntryData: (entry) ->
    key = @_positionKey entry

    @_getItem(key) || entry

  _getItem: (key) ->
    JSON.parse  @storage.getItem key

  _positionKey: (entry) ->
    if entry?
      entryUpdatedAt = new Date(entry.updated_at).getTime()
      STORAGE_PREFIX + ':' + entry.id + ':' + entryUpdatedAt
    else
      STORAGE_PREFIX + ':' + 'new'

  _encodeImageAttachments: (imageAttachments) ->
    imageAttachments.map (imageAttachment) -> imageAttachment.src

  _decodeImageAttachments: (imageAttachments) ->
    imageAttachments.map (imageAttachment) ->
      image     = new Image()
      image.src = imageAttachment

      image
