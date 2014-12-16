window.MediaBox_VideoWelcome = React.createClass

  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
    <MediaBox_Layout type="video">
      <div className="media-box__info">
        <div className="media-box__text">
          <a title="Вставьте"
             onClick={ this.props.onClick }>
            Вставьте
          </a>
          <span> ссылку на видео.</span>
          <br />
          <span> Мы поддерживаем YouTube, Instagram, Coub и другие.</span>
        </div>
      </div>
    </MediaBox_Layout>