class window.NormalizedEntry
  # data1
  # data2
  # data3
  # embedHtml
  # embedUrl
  # attachments

window.EntryNormalizationService =

  # entyData - не нормалозованная entry
  normalize: (entryData, entryType) ->

    switch entryType
      when 'text'
        normalizedEntry = {
          data1:    entryData.title
          data2:    entryData.text
        }
      when 'image'
        normalizedEntry = {
          data2:     entryData.text
          embedUrl:  entryData.image_url
          # image_attachments: entry.image_attachments
          # image_attachments: @_decodeImageAttachments(entryData.image_attachments || [])
        }
      when 'instagram'
        normalizedEntry = {
          data1:     entryData.text
          embedHtml: entryData.embedHtml
          embedUrl:  entryData.video_url
        }
      when 'music'
        normalizedEntry = {
          data1:     entryData.text
          embedHtml: entryData.embedHtml
          embedUrl:  entryData.video_url
        }
      when 'video'
        normalizedEntry = {
          data1:     entryData.text
          embedHtml: entryData.embedHtml
          embedUrl:  entryData.video_url
        }
      when 'quote'
        attr = {
          data1:     entryData.text
          data2:     entryData.title
        }
      else

    attr.id         = entryData.id
    attr.updated_at = entryData.updated_at

    new NormalizedEntry(attr)

  denormalize: (normalizedEntry, entryType) ->
    # check normalizedentry if type NormalizedEntry
    switch entryType
      when 'text'
        denormalizedEntry = {
          title: entryData.title
          text:  entryData.text
        }
      when 'image'
        denormalizedEntry = {
          title:     entryData.text
          image_url: entryData.imageUrl
          image_attachments: entryData.image_attachments || []
          # image_attachments: @_decodeImageAttachments(entryData.image_attachments || [])
        }
      when 'instagram'
        denormalizedEntry = {
          title:     entryData.text
          embed_html: entryData.embedHtml
          video_url:  entryData.videoUrl
        }
      when 'music'
        denormalizedEntry = {
          title:     entryData.text
          embed_html: entryData.embedHtml
          video_url:  entryData.videoUrl
        }
      when 'video'
        denormalizedEntry = {
          title:     entryData.text
          embed_html: entryData.embedHtml
          video_url:  entryData.video_url
        }
      when 'quote'
        denormalizedEntry = {
          text:  entryData.text
          title: entryData.source
        }
      else
        console.error 'Невозможно восстановить пост, неивестный тип поста', entryType

    denormalizedEntry
