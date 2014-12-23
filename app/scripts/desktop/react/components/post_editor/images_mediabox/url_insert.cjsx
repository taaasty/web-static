PureRenderMixin = require 'react/lib/ReactComponentWithPureRenderMixin'

window.ImagesMediaBox_UrlInsert = React.createClass
  mixins: [PureRenderMixin]

  propTypes:
    imageUrl: React.PropTypes.string
    onExit:   React.PropTypes.func.isRequired
    onChange: React.PropTypes.func.isRequired

  render: ->
    <label htmlFor="media-box-image-url"
           className="media-box__form">
      <input ref="imageUrl"
             type="url"
             autoFocus={ true }
             id="media-box-image-url"
             className="media-box__form-input"
             onPaste={ this.onPaste }
             onBlur={ this.props.onExit } />
       <MediaBox_Actions onDelete={ this.props.onExit } />
     </label>

  onPaste: (e) ->
    @props.onChange e.clipboardData.getData 'text/plain'