CollageManager = require './collage/collageManager'
{ PropTypes } = React

ImageAttachmentsCollage = React.createClass
  displayName: 'ImageAttachmentsCollage'

  propTypes:
    width: PropTypes.number
    imageAttachments: PropTypes.array.isRequired

  render: ->
    <CollageManager
        width={ @props.width }
        images={ @getCollageImages() }
        recalculation={ false } />

  getCollageImages: ->
    @props.imageAttachments.map (imageAttachment) ->
      image = imageAttachment.image
      newImage =
        width: image.geometry.width
        height: image.geometry.height
        payload:
          id: imageAttachment.id || imageAttachment.uuid
          url: image.url
          path: image.path
          title: image.title

      newImage

module.exports = ImageAttachmentsCollage