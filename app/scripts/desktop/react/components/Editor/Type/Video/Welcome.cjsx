MediaBox = require '../../MediaBox'
{ PropTypes } = React

EditorTypeVideoWelcome = React.createClass
  displayName: 'EditorTypeVideoWelcome'

  propTypes:
    onClickInsertState: PropTypes.func.isRequired

  render: ->
    <MediaBox entryType="video">
      <div className="media-box__info">
        <div className="media-box__text">
          <a title={ i18n.t('editor_welcome_video_insert') }
             onClick={ @handleClickInsert }>
            { i18n.t('editor_welcome_video_insert') }
          </a>
          <span> { i18n.t('editor_welcome_video_link') }</span>
          <br />
          <span> { i18n.t('editor_welcome_video_supported_services') }</span>
        </div>
      </div>
    </MediaBox>

  handleClickInsert: (e) ->
    e.preventDefault()
    @props.onClickInsertState()

module.exports = EditorTypeVideoWelcome
