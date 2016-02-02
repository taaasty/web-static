_ = require 'lodash'
EditorMediaBoxActions = require '../../MediaBox/MediaBoxActions'
{ PropTypes } = React

EditorTypeImageLoaded = React.createClass
  displayName: 'EditorTypeImageLoaded'

  propTypes:
    imageUrl: PropTypes.string
    imageAttachments: PropTypes.array.isRequired
    loading: React.PropTypes.bool.isRequired
    onDelete: PropTypes.func.isRequired

  shouldComponentUpdate: (nextProps) ->
    # Не обновляем компонент, если количество аттачментов или путь до картинки
    # остались прежними. Тем самым избавляемся от перерисовки blob => remote image url
    if @props.imageAttachments.length != nextProps.imageAttachments.length ||
       @props.imageUrl != nextProps.imageUrl
      true
    else
      false

  render: ->
    <div className="media-box__display">
      {@renderImage()}
      {@renderActions()}
    </div>

  renderImage: ->
    switch
      when @props.imageAttachments.length
        <ImageAttachmentsCollage imageAttachments={ @props.imageAttachments } />
      when @props.imageUrl
        <img src={ @props.imageUrl } />
      else null

  renderActions: ->
    unless @props.loading
      <EditorMediaBoxActions onDelete={ @props.onDelete } />

module.exports = EditorTypeImageLoaded