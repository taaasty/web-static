_ = require 'lodash'
CollageManager = require '../../../../../../shared/react/components/common/collage/collageManager'
EditorMediaBoxActions = require '../../MediaBox/MediaBoxActions'
{ PropTypes } = React

EditorTypeImageLoaded = React.createClass
  displayName: 'EditorTypeImageLoaded'

  propTypes:
    imageUrl: PropTypes.string
    imageAttachments: PropTypes.array.isRequired
    onDelete: PropTypes.func.isRequired

  render: ->
    <div className="media-box__display">
      <CollageManager images={ @getCollageImages() } />
      <EditorMediaBoxActions onDelete={ @props.onDelete } />
    </div>

  getCollageImages: ->
    @props.imageAttachments.map (imageAttachment) ->
      image    = imageAttachment.image
      newImage =
        width:  image.geometry.width
        height: image.geometry.height
        payload:
          id:    imageAttachment.id
          url:   image.url
          path:  image.path
          title: image.title

      newImage

module.exports = EditorTypeImageLoaded