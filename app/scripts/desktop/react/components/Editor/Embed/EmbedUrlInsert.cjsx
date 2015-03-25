MediaBox = require '../MediaBox/MediaBox'
MediaBoxActions = require '../MediaBox/MediaBoxActions'
{ PropTypes } = React

EditorEmbedUrlInsert = React.createClass
  displayName: 'EditorEmbedUrlInsert'

  propTypes:
    onInsert: PropTypes.func.isRequired
    onCancel: PropTypes.func.isRequired

  render: ->
    <MediaBox entryType="video" state="insert">
      <label htmlFor="media-box-video-url"
             className="media-box__form">
        <input type="url"
               autoFocus={ true }
               id="media-box-video-url"
               className="media-box__form-input" 
               onPaste={ @handlePaste }
               onBlur={ @handleBlur } />
      </label>
      <MediaBoxActions onDelete={ @props.onCancel } />
    </MediaBox>

  handlePaste: (e) ->
    @props.onInsert e.clipboardData.getData 'text/plain'

  handleBlur: ->
    @props.onCancel()

module.exports = EditorEmbedUrlInsert