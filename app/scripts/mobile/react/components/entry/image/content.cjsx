{ PropTypes } = React

module.exports = React.createClass
  displayName: 'ImageEntryContent'

  propTypes:
    title:            PropTypes.string.isRequired
    imageAttachments: PropTypes.array.isRequired

  render: ->
    <div className="post__content">
      { @renderEntryImage() }
      <p>{ @props.title }</p>
    </div>

  renderEntryImage: ->
    #TODO: Images Collage
    #TODO: Thumbor optimizations
    image = @props.imageAttachments[0].image

    return <div className="media-image">
             <img src={ image.url }
                  width={ image.geometry.width }
                  height={ image.geometry.height } />
            </div>