{ PropTypes } = React

EditorPreviewButton = React.createClass
  displayName: 'EditorPreviewButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="button button--grey"
            onClick={ @handleClick }>
      <span className="button__text">
        { i18n.t('editor_preview_button') }
      </span>
    </button>

  handleClick: ->
    @props.onClick()

module.exports = EditorPreviewButton