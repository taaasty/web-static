CollageManager = require '../../../common/collage/collageManager'
{ PropTypes } = React

ImageEntryAttachments = React.createClass
  displayName: 'ImageEntryAttachments'

  propTypes:
    imageAttachments: PropTypes.array.isRequired

  render: ->
    <CollageManager images={ @getImages() } />

  getImages: ->
    @props.imageAttachments.map (imageAttachment) ->
      image    = imageAttachment.image
      newImage =
        width:  image.geometry.width
        height: image.geometry.height
        payload:
          id:    imageAttachment.id
          url:   image.url
          title: image.title

      newImage

module.exports = ImageEntryAttachments