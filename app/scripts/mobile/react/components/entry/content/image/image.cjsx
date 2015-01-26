i18n = require 'i18next'
ImageEntryAttachments = require './attachments'
{ PropTypes } = React

ENTRY_WITHOUT_IMAGE_MESSAGE = -> i18n.t 'empty_image_entry'

ImageEntryContent = React.createClass
  displayName: 'ImageEntryContent'

  propTypes:
    title:            PropTypes.string.isRequired
    imageUrl:         PropTypes.string
    imageAttachments: PropTypes.array.isRequired

  render: ->
    <div className="post__content">
      { @renderEntryImage() }
      <p>{ @props.title }</p>
    </div>

  renderEntryImage: ->
    content = switch
      when @props.imageAttachments then <ImageEntryAttachments imageAttachments={ @props.imageAttachments } />
      when @props.imageUrl         then <img src={ @props.imageUrl } />
      else ENTRY_WITHOUT_IMAGE_MESSAGE()

    return <div className="media-image">
             { content }
           </div>

module.exports = ImageEntryContent