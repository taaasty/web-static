MediaBox = require '../MediaBox/MediaBox'
MediaBoxActions = require '../MediaBox/MediaBoxActions'
{ PropTypes } = React

EditorEmbedLoaded = React.createClass
  displayName: 'EditorEmbedLoaded'

  propTypes:
    embedHtml: PropTypes.string.isRequired
    onDelete: PropTypes.func.isRequired

  render: ->
    <MediaBox entryType="video" state="loaded">
      <div className="media-box__display"
           dangerouslySetInnerHTML={{ __html: @props.embedHtml }} />
      <MediaBoxActions onDelete={ @props.onDelete } />
    </MediaBox>

module.exports = EditorEmbedLoaded