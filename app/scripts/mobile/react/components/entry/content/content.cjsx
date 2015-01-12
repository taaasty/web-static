TextEntryContent    = require './text/text'
ImageEntryContent   = require './image/image'
VideoEntryContent   = require './video/video'
QuoteEntryContent   = require './quote/quote'
UnknownEntryContent = require './unknown/unknown'
{ PropTypes } = React

TEXT_TYPE  = 'text'
IMAGE_TYPE = 'image'
VIDEO_TYPE = 'video'
QUOTE_TYPE = 'quote'

EntryContent = React.createClass
  displayName: 'EntryContent'

  propTypes:
    entry: PropTypes.object.isRequired

  render: ->
    switch @props.entry.type
      when TEXT_TYPE
        <TextEntryContent
            title={ @props.entry.title }
            text={ @props.entry.text } />
      when IMAGE_TYPE
        <ImageEntryContent
            title={ @props.entry.title }
            imageUrl={ @props.entry.image_url }
            imageAttachments={ @props.entry.image_attachments } />
      when VIDEO_TYPE
        <VideoEntryContent iframely={ @props.entry.iframely } />
      when QUOTE_TYPE
        <QuoteEntryContent
            text={ @props.entry.text }
            source={ @props.entry.source } />
      else
        <UnknownEntryContent title={ @props.entry.title } />

module.exports = EntryContent