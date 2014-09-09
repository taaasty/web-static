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

window.EntryStoreService =
  storage: {}

  storeEntry: (data) ->
    switch data.type
      when 'text'
        @storage.title = data.title
        @storage.text  = data.text
      when 'image'
        @storage.text              = data.title
        @storage.image_url         = data.image_url
        @storage.image_attachments = data.image_attachments
      when 'instagram'
        @storage.text      = data.title
        @storage.embedHtml = data.embedHtml
        @storage.video_url = data.video_url
      when 'music'
        @storage.text      = data.title
        @storage.embedHtml = data.embedHtml
        @storage.video_url = data.video_url
      when 'video'
        @storage.text      = data.title
        @storage.embedHtml = data.embedHtml
        @storage.video_url = data.video_url
      when 'quote'
        @storage.title = data.text
        @storage.text  = data.source
      else
        console.error 'Невозможно сохранить пост, неивестный тип поста', data.type

  restoreEntry: (type) ->
    switch type
      when 'text'
        entry = {
          type:  'text'
          title: @storage.title
          text:  @storage.text
        }
      when 'image'
        entry = {
          type:              'image'
          title:             @storage.text
          image_url:         @storage.image_url
          image_attachments: @storage.image_attachments || []
        }
      when 'instagram'
        entry = {
          type:      'instagram'
          title:     @storage.text
          embedHtml: @storage.embedHtml
          video_url: @storage.video_url
        }
      when 'music'
        entry = {
          type:      'music'
          title:     @storage.text
          embedHtml: @storage.embedHtml
          video_url: @storage.video_url
        }
      when 'video'
        entry = {
          type:      'video'
          title:     @storage.text
          embedHtml: @storage.embedHtml
          video_url: @storage.video_url
        }
      when 'quote'
        entry = {
          type:   'quote'
          text:   @storage.text
          source: @storage.title
        }
      else
        console.error 'Невозможно восстановить пост, неивестный тип поста', data.type