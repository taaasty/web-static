class window.NormalizedEntry
  # data1
  # data2
  # data3
  # embedHtml
  # embedUrl
  # imageAttachments
  constructor: (data) ->
    _.extend @, data

window.EntryNormalizer =

  # entyData - не нормалозованная entry
  normalize: (entryData) ->

    attr =
      switch entryData.type
        when 'text'
          data1:    entryData.title
          data2:    entryData.text
        when 'image'
          data2:     entryData.title
          embedUrl:  entryData.image_url
          # image_attachments: entry.image_attachments
          # image_attachments: @_decodeImageAttachments(entryData.image_attachments || [])
        when 'instagram', 'music', 'video'
          data2:     entryData.title
          embedHtml: entryData.embedHtml
          embedUrl:  entryData.video_url
        when 'quote'
          data1:     entryData.text
          data2:     entryData.source
        else
          console.error? "Unknown entry type #{entryData.type}"

    attr.id         = entryData.id
    attr.updated_at = entryData.updated_at

    new NormalizedEntry(attr)

  #denormalize: (normalizedEntry, entryType) ->
    ## check normalizedentry if type NormalizedEntry
    #switch entryType
      #when 'text'
        #denormalizedEntry = {
          #title: entryData.title
          #text:  entryData.text
        #}
      #when 'image'
        #denormalizedEntry = {
          #title:     entryData.text
          #image_url: entryData.imageUrl
          #image_attachments: entryData.image_attachments || []
          ## image_attachments: @_decodeImageAttachments(entryData.image_attachments || [])
        #}
      #when 'instagram'
        #denormalizedEntry = {
          #title:     entryData.text
          #embed_html: entryData.embedHtml
          #video_url:  entryData.videoUrl
        #}
      #when 'music'
        #denormalizedEntry = {
          #title:     entryData.text
          #embed_html: entryData.embedHtml
          #video_url:  entryData.videoUrl
        #}
      #when 'video'
        #denormalizedEntry = {
          #title:     entryData.text
          #embed_html: entryData.embedHtml
          #video_url:  entryData.video_url
        #}
      #when 'quote'
        #denormalizedEntry = {
          #text:  entryData.text
          #title: entryData.source
        #}
      #else
        #console.error 'Невозможно восстановить пост, неивестный тип поста', entryType

    #denormalizedEntry
