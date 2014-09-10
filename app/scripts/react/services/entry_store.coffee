STORAGE_PREFIX = 'storeEntries'

window.EntryStoreService =
  storage: window.localStorage

  storeEntry: (data, entryId) ->
    entryData = @_getEntryData({ id: entryId })

    switch data.type
      when 'text'
        entryData.title = data.title
        entryData.text  = data.text
      when 'image'
        entryData.text      = data.title
        entryData.image_url = data.image_url
        # entryData.image_attachments = @_encodeImageAttachments(data.image_attachments)
      when 'instagram'
        entryData.text      = data.title
        entryData.embedHtml = data.embedHtml
        entryData.video_url = data.video_url
      when 'music'
        entryData.text      = data.title
        entryData.embedHtml = data.embedHtml
        entryData.video_url = data.video_url
      when 'video'
        entryData.text      = data.title
        entryData.embedHtml = data.embedHtml
        entryData.video_url = data.video_url
      when 'quote'
        entryData.title = data.source
        entryData.text  = data.text
      else
        console.error 'Невозможно сохранить пост, неивестный тип поста', data.type

    @storage.setItem @_positionKey({ id: entryId }), JSON.stringify(entryData)

  restoreEntry: (type, entry) ->
    entryData = @_getEntryData(entry)

    switch type
      when 'text'
        entryData = {
          id:    entryData.id
          type:  'text'
          title: entryData.title
          text:  entryData.text
        }
      when 'image'
        entryData = {
          id:                entryData.id
          type:              'image'
          title:             entryData.text
          image_url:         entryData.image_url
          image_attachments: []
          # image_attachments: @_decodeImageAttachments(entryData.image_attachments || [])
        }
      when 'instagram'
        entryData = {
          id:        entryData.id
          type:      'instagram'
          title:     entryData.text
          embedHtml: entryData.embedHtml
          video_url: entryData.video_url
        }
      when 'music'
        entryData = {
          id:        entryData.id
          type:      'music'
          title:     entryData.text
          embedHtml: entryData.embedHtml
          video_url: entryData.video_url
        }
      when 'video'
        entryData = {
          id:        entryData.id
          type:      'video'
          title:     entryData.text
          embedHtml: entryData.embedHtml
          video_url: entryData.video_url
        }
      when 'quote'
        entryData = {
          id:     entryData.id
          type:   'quote'
          text:   entryData.text
          source: entryData.title
        }
      else
        console.error 'Невозможно восстановить пост, неивестный тип поста', type

    entryData

  removeEntry: (entryId) ->
    @storage.removeItem @_positionKey({ id: entryId })

  _getEntryData: (entry) ->
    JSON.parse( @storage.getItem(@_positionKey(entry)) ) || entry

  _positionKey: (entry) ->
    if entry?.id
      STORAGE_PREFIX + ':' + entry.id
    else
      STORAGE_PREFIX + ':' + 'new'

  _encodeImageAttachments: (imageAttachments) ->
    imageAttachments.map (imageAttachment) -> imageAttachment.src

  _decodeImageAttachments: (imageAttachments) ->
    imageAttachments.map (imageAttachment) ->
      image     = new Image()
      image.src = imageAttachment

      image