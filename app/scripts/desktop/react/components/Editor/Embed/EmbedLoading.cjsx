MediaBox = require '../MediaBox'
{ PropTypes } = React

EditorEmbedLoading = React.createClass
  displayName: 'EditorEmbedLoading'

  propTypes:
    embedUrl: PropTypes.string.isRequired

  render: ->
    <MediaBox entryType="video">
      <div className="media-box__info">
        <div className="media-box__text">
          <span>{ @props.embedUrl }</span>
          <br />
          <span>{ i18n.t('editor_video_mediabox_loading') }</span>
        </div>
      </div>
    </MediaBox>

module.exports = EditorEmbedLoading
