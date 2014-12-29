{ PropTypes } = React

CommentActionsButton = React.createClass
  displayName: 'CommentActionsButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="comment__actions-button"
            onClick={ @props.onClick }>
      <i className="icon icon--dots" />
    </button>

module.exports = CommentActionsButton