window.EntryNormalizationService =

  normalize: (entryData, entryType) ->
    switch entryType
      when 'text'
        normalizedEntry = {
          title: entryData.title
          text:  entryData.text
        }
      when 'image'
        normalizedEntry = {
          title:     entryData.text
          image_url: entryData.image_url
          # image_attachments: entry.image_attachments
          # image_attachments: @_decodeImageAttachments(entryData.image_attachments || [])
        }
      when 'instagram'
        normalizedEntry = {
          title:     entryData.text
          embedHtml: entryData.embedHtml
          videoUrl:  entryData.video_url
        }
      when 'music'
        normalizedEntry = {
          title:     entryData.text
          embedHtml: entryData.embedHtml
          videoUrl:  entryData.video_url
        }
      when 'video'
        normalizedEntry = {
          title:     entryData.text
          embedHtml: entryData.embedHtml
          videoUrl:  entryData.video_url
        }
      when 'quote'
        normalizedEntry = {
          text:   entryData.text
          source: entryData.title
        }
      else

    normalizedEntry

  denormalize: (entryData, entryType) ->
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