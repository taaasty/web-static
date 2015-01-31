window.MediaBox_VideoWelcome = React.createClass

  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
    <MediaBox_Layout type="video">
      <div className="media-box__info">
        <div className="media-box__text">
          <a title={ i18n.t('editor_welcome_video_insert') }
             onClick={ this.props.onClick }>
            { i18n.t('editor_welcome_video_insert') }
          </a>
          <span> { i18n.t('editor_welcome_video_link') }</span>
          <br />
          <span> { i18n.t('editor_welcome_video_supported_services') }</span>
        </div>
      </div>
    </MediaBox_Layout>