###* @jsx React.DOM ###

window.ImagesMediaBox_UrlInsert = React.createClass
  mixins:         [React.addons.PureRenderMixin]

  propTypes:
    imageUrl:         React.PropTypes.string
    onExit:           React.PropTypes.func.isRequired
    onChangeImageUrl: React.PropTypes.func.isRequired

  render: ->
    `<label className="media-box__form" htmlFor="media-box-image-url">
      <input id="media-box-image-url"
             ref="imageUrl"
             autoFocus={true}
             className="media-box__form-input"
             onPasteCapture={this.onPaste}
             onBlur={this.props.onExit}
             type="url" />
       <MediaBox_Actions onDelete={this.props.onExit} />
     </label>`

  onPaste: (event, d) ->
    @props.onChangeImageUrl event.clipboardData.getData('text/plain')
