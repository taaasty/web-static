{ PropTypes } = React

EditorTypeImageWelcome = React.createClass
  displayName: 'EditorTypeImageWelcome'

  propTypes:
    onClickInsertState: PropTypes.func.isRequired
    onSelectFiles: PropTypes.func.isRequired

  render: ->
    <div className="media-box__info">
      <div className="media-box__text">
        <span>{ i18n.t('editor_welcome_move_or') } </span>
        <span className="form-upload form-upload--image">
           <span className="form-upload__text">{ i18n.t('editor_welcome_choose') }</span>
           <input type="file"
                  id="image"
                  className="form-upload__input"
                  accept="image/*"
                  multiple={ true }
                  onChange={ @handleChange } />
         </span>
        <span> { i18n.t('editor_welcome_picture_or') }</span><br />
        <a title={ i18n.t('editor_welcome_insert') }
           onClick={ @handleClickInsert }>
          { i18n.t('editor_welcome_insert') }
        </a>
        <span> { i18n.t('editor_welcome_link_to_it') }</span>
      </div>
    </div>

  handleChange: (e) ->
    files = e.target.files
    @props.onSelectFiles files if files.length

  handleClickInsert: (e) ->
    e.preventDefault()
    @props.onClickInsertState()

module.exports = EditorTypeImageWelcome