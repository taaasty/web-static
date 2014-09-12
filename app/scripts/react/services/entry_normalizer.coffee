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