CollageManager = require '../../common/collage/collageManager'
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
      newImage = payload: {}

      for key, value of image
        if key isnt 'geometry'
          newImage.payload[key] = value
        else
          newImage[k] = v for k, v of image[key]

      newImage

module.exports = ImageEntryAttachments