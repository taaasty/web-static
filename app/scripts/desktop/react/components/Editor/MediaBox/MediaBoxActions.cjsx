{ PropTypes } = React

EditorMediaBoxActions = React.createClass
  displayName: 'EditorMediaBoxActions'

  propTypes:
    onDelete: PropTypes.func.isRequired

  render: ->
    <div className="media-box__actions">
      <div title={ i18n.t('editor_mediabox_delete') }
           className="media-box__action media-box__action--delete"
           onClick={ @handleClick }>
        <span className="icon icon--cross" />
      </div>
    </div>

  handleClick: ->
    @props.onDelete()

module.exports = EditorMediaBoxActions