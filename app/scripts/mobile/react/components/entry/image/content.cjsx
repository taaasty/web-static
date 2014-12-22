{ PropTypes } = React

#TODO: i18n
ENTRY_WITHOUT_IMAGE_MESSAGE = 'У данного поста нет изображения.'

module.exports = React.createClass
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
    image = @props.imageUrl || @props.imageAttachments[0]?.image

    #TODO: Images Collage
    #TODO: Thumbor optimizations

    content = switch typeof image
      when 'string' then <img src={ image } />
      when 'object' then <img src={ image.url }
                              width={ image.geometry.width }
                              height={ image.geometry.height } />
      else ENTRY_WITHOUT_IMAGE_MESSAGE

    return <div className="media-image">
             { content }
           </div>