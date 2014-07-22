###* @jsx React.DOM ###
#
window.VideoMediaBox_Welcome = React.createClass
  propTypes:
    onClick: React.PropTypes.func.isRequired

  render: ->
    `<MediaBox_Layout type='video'>
      <div className="media-box__info">
        <div className="media-box__text">
          <a onClick={this.props.onClick} title="Вставьте">Вставьте</a>
          <span> ссылку на видео.</span>
          <br />
          <span> Мы поддерживаем YouTube, Coub, SoundCloud и другие.</span>
        </div>
      </div>
     </MediaBox_Layout>`
