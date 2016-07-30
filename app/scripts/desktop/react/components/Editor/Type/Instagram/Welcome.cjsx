MediaBox = require '../../MediaBox'
{ PropTypes } = React

EditorTypeInstagramWelcome = React.createClass
  displayName: 'EditorTypeInstagramWelcome'

  propTypes:
    onClickInsertState: PropTypes.func.isRequired

  render: ->
    <MediaBox entryType="video">
      <div className="media-box__info">
        <div className="media-box__text">
          <a title={ i18n.t('editor_welcome_instagram_insert') }
             onClick={ @handleClickInsert }>
            { i18n.t('editor_welcome_instagram_insert') }
          </a>
          <span> { i18n.t('editor_welcome_instagram_link') }</span>
        </div>
      </div>
    </MediaBox>

  handleClickInsert: (e) ->
    e.preventDefault()
    @props.onClickInsertState()

module.exports = EditorTypeInstagramWelcome
