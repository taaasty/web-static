window.MediaBox_MusicWelcome = React.createClass

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
          <span> ссылку на музыку.</span>
          <br />
          <span> Мы поддерживаем Soundcloud, Grooveshark и другие сервисы с легальным контентом.</span>
        </div>
      </div>
    </MediaBox_Layout>