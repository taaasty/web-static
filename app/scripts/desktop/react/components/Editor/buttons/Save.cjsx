{ PropTypes } = React

EditorSaveButton = React.createClass
  displayName: 'EditorSaveButton'

  propTypes:
    private: PropTypes.bool.isRequired
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="button button--green"
            onClick={ @handleClick }>
      <span className="button__text">
        { @getTitle() }
      </span>
    </button>

  getTitle: ->
    if @props.private then i18n.t 'editor_save_button' else i18n.t 'editor_publish_button'

  handleClick: ->
    @props.onClick()

module.exports = EditorSaveButton