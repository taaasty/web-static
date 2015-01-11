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
    media = @props.imageUrl || @props.imageAttachments

    #TODO: Images Collage
    #TODO: Thumbor optimizations

    content = switch Object::toString.call media
      when '[object String]' then <img src={ media } />
      when '[object Array]'  then <ImageEntryAttachments imageAttachments={ media } />
      else ENTRY_WITHOUT_IMAGE_MESSAGE

    return <div className="media-image">
             { content }
           </div>

module.exports = ImageEntryContent