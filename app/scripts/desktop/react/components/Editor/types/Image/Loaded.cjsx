_ = require 'lodash'
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
      { @renderImage() }
      <EditorMediaBoxActions onDelete={ @props.onDelete } />
    </div>

  renderImage: ->
    switch
      when @props.imageAttachments.length
        <ImageAttachmentsCollage imageAttachments={ @props.imageAttachments } />
      when @props.imageUrl
        <img src={ @props.imageUrl } />
      else null

module.exports = EditorTypeImageLoaded