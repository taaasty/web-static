{ PropTypes } = React

module.exports = React.createClass
  displayName: 'ActionMenuButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="action-menu-button"
            onClick={ @props.onClick }>
      <i className="icon icon--dots" />
    </button>