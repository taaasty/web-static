_ = require 'lodash'
EditorMediaBoxActions = require '../../MediaBox/MediaBoxActions'
{ PropTypes } = React

EditorTypeImageLoaded = React.createClass
  displayName: 'EditorTypeImageLoaded'

  propTypes:
    imageUrl: PropTypes.string
    imageAttachments: PropTypes.array.isRequired
    onDelete: PropTypes.func.isRequired

  shouldComponentUpdate: (nextProps) ->
    if not _.isEqual @props.imageAttachments, nextProps.imageAttachments ||
       not @props.imageUrl is nextProps.imageUrl
      return true
    false

  render: ->
    <div className="media-box__display">
      <ImagesCollage images={ @getCollageImages() } />
      <EditorMediaBoxActions onDelete={ @props.onDelete } />
    </div>

  getCollageImages: ->
    if @props.imageUrl
      image = new Image()
      image.src = @props.imageUrl
      [image]
    else
      _.map @props.imageAttachments, (attachment) ->
        image = new Image()
        image.src = attachment.image.url
        image

module.exports = EditorTypeImageLoaded