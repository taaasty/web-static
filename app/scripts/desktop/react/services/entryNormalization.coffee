_ = require 'lodash'
NormalizedEntry = require '../entities/normalizedEntry'

CORRESPONDENCE_NORMALIZED_TABLE =
  text:
    title: 'data1'
    text: 'data2'
  anonymous:
    title: 'data1'
    text: 'data2'
  image:
    title: 'data2'
    imageUrl: 'imageUrl'
    imageAttachments: 'imageAttachments'
  instagram:
    title: 'data2'
    embedUrl: 'embedUrl'
    embedHtml: 'embedHtml'    
  music:
    title: 'data2'
    embedUrl: 'embedUrl'
    embedHtml: 'embedHtml'
  video:
    title: 'data2'
    embedUrl: 'embedUrl'
    embedHtml: 'embedHtml'
  quote:
    source: 'data1'
    text: 'data2'

EntryNormalizationService =
  normalize: (entry) ->
    attrs =
      id: entry.id
      type: entry.type
      privacy: entry.privacy
      updatedAt: new Date(entry.updated_at).getTime()

    switch entry.type
      when 'text', 'anonymous'
        _.extend attrs,
          data1: entry.title
          data2: entry.text
      when 'image'
        _.extend attrs,
          data2: entry.title
          imageUrl: entry.image_url
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

  getNormalizedEntryValue: (normalizedEntry, key) ->
    correspondingValues = CORRESPONDENCE_NORMALIZED_TABLE[normalizedEntry.type]
    normalizedEntry[correspondingValues[key]] || null

  getNormalizedKey: (normalizedEntry, key) ->
    correspondingValues = CORRESPONDENCE_NORMALIZED_TABLE[normalizedEntry.type]
    correspondingValues[key] || null

module.exports = EntryNormalizationService