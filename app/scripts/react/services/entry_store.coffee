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

  storeEntry: (data) ->
    entryData = @_getEntryData()

    switch data.type
      when 'text'
        entryData.title = data.title
        entryData.text  = data.text
      when 'image'
        entryData.text              = data.title
        entryData.image_url         = data.image_url
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

    @storage.setItem @_positionKey(), JSON.stringify(entryData)

  restoreEntry: (type) ->
    entryData = @_getEntryData()

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
          image_attachments: []
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

    entryData

  removeEntry: ->
    @storage.removeItem @_positionKey()

  _getEntryData: (type) ->
    JSON.parse( @storage.getItem(@_positionKey()) ) || {}

  _positionKey: -> STORAGE_PREFIX + ':' + 'new'

  _encodeImageAttachments: (imageAttachments) ->
    imageAttachments.map (imageAttachment) -> imageAttachment.src

  _decodeImageAttachments: (imageAttachments) ->
    imageAttachments.map (imageAttachment) ->
      image     = new Image()
      image.src = imageAttachment

      image