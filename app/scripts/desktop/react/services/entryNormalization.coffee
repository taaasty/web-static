_ = require 'lodash'
NormalizedEntry = require '../entities/normalizedEntry'

EntryNormalizationService =
  normalize: (entry) ->
    attrs =
      id: entry.id
      type: entry.type
      privacy: entry.privacy
      updatedAt: new Date(entry.updated_at).getTime()

    switch entry.type
      when 'text'
        _.extend attrs,
          data1: entry.title
          data2: entry.text
      when 'image'
        _.extend attrs,
          data2: entry.title
          embedUrl: entry.image_url
          imageAttachments: entry.image_attachments
        # image_attachments: @_decodeImageAttachments(entryData.image_attachments || [])
      when 'instagram', 'music', 'video'
        _.extend attrs,
          data2: entry.title
          embedUrl: entry.iframely.url
          embedHtml: entry.iframely.html
      when 'quote'
        _.extend attrs,
          data1: entry.source
          data2: entry.text
      else
        console.error? "Unknown entry type #{ entry.type }"

    new NormalizedEntry attrs

module.exports = EntryNormalizationService