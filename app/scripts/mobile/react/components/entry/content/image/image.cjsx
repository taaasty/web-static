ImageEntryAttachments = require './attachments'
{ PropTypes } = React

#TODO: i18n
ENTRY_WITHOUT_IMAGE_MESSAGE = 'У данного поста нет изображения.'

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
      when @props.imageUrl         then <img src={ @props.imageUrl } />
      when @props.imageAttachments then <ImageEntryAttachments imageAttachments={ @props.imageAttachments } />
      else ENTRY_WITHOUT_IMAGE_MESSAGE

    return <div className="media-image">
             { content }
           </div>

module.exports = ImageEntryContent