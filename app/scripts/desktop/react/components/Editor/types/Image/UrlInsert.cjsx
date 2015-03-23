EditorMediaBoxActions = require '../../MediaBox/MediaBoxActions'
{ PropTypes } = React

EditorTypeImageUrlInsert = React.createClass
  displayName: 'EditorTypeImageUrlInsert'

  propTypes:
    onInsertImageUrl: PropTypes.func.isRequired
    onCancel: PropTypes.func.isRequired

  render: ->
    <label htmlFor="media-box-image-url"
           className="media-box__form">
      <input type="url"
             autoFocus={ true }
             id="media-box-image-url"
             className="media-box__form-input"
             onPaste={ @handlePaste }
             onBlur={ @handleBlur } />
       <EditorMediaBoxActions onDelete={ @props.onCancel } />
     </label>

  handlePaste: (e) ->
    @props.onInsertImageUrl e.clipboardData.getData 'text/plain'

  handleBlur: ->
    @props.onCancel()

module.exports = EditorTypeImageUrlInsert