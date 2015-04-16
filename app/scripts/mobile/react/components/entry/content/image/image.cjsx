ImageEntryAttachments = require './attachments'
{ PropTypes } = React

ImageEntryContent = React.createClass
  displayName: 'ImageEntryContent'

  propTypes:
    title:            PropTypes.string.isRequired
    imageUrl:         PropTypes.string
    imageAttachments: PropTypes.array.isRequired

  render: ->
    <div className="post__content">
      { @renderEntryImage() }
      <p dangerouslySetInnerHTML={{ __html: @props.title }} />
    </div>

  renderEntryImage: ->
    content = switch
      when @props.imageAttachments then <ImageEntryAttachments imageAttachments={ @props.imageAttachments } />
      when @props.imageUrl         then <img src={ @props.imageUrl } />
      else i18n.t 'entry.empty_image'

    return <div className="media-image">
             { content }
           </div>

module.exports = ImageEntryContent