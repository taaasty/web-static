Collage = require '../../common/collage/collage'
{ PropTypes } = React

ImageEntryAttachments = React.createClass
  displayName: 'ImageEntryAttachments'

  propTypes:
    imageAttachments: PropTypes.array.isRequired

  render: ->
    <Collage images={ @getImages() } />

  getImages: ->
    # Image
    # content_type: "image/jpeg"
    # created_at: "2015-01-10T12:16:50.000+03:00"
    # frames_count: 1
    # id: 16755650
    # image:
    #   geometry:
    #     height: 604
    #     width: 604
    #   path: "att/aa/bb/16755650_253929_19591160_289a0a54-edfc-45c4-a77d-040f2e7298f4.jpg"
    #   source: "image_attachment"
    #   title: null
    #   url: "http://taaasty.ru/assets/att/aa/bb/16755650_253929_19591160_289a0a54-edfc-45c4-a77d-040f2e7298f4.jpg"

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