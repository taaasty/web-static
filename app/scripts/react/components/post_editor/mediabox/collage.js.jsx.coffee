###* @jsx React.DOM ###

window.MediaBox_Collage = React.createClass
  propTypes:
    imageAttachments:   React.PropTypes.array.isRequired

  render: ->
    imageUrls = @props.imageAttachments.map (a) ->
      a.image.url

    `<div className="media-box__display">
      <ImagesCollage imageUrls={imageUrls} width={713} />
    </div>`

