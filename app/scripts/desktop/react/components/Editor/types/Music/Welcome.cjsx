MediaBox = require '../../MediaBox/MediaBox'
{ PropTypes } = React

EditorTypeMusicWelcome = React.createClass
  displayName: 'EditorTypeMusicWelcome'

  propTypes:
    onClickInsertState: PropTypes.func.isRequired

  render: ->
    <MediaBox entryType="video">
      <div className="media-box__info">
        <div className="media-box__text">
          <a title={ i18n.t('editor_welcome_music_insert') }
             onClick={ @handleClickInsert }>
            { i18n.t('editor_welcome_music_insert') }
          </a>
          <span> { i18n.t('editor_welcome_music_supported_services') }</span>
        </div>
      </div>
    </MediaBox>

  handleClickInsert: (e) ->
    e.preventDefault()
    @props.onClickInsertState()

module.exports = EditorTypeMusicWelcome