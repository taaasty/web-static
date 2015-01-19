{ PropTypes } = React

HeroTlogActions_DropdownMenu_Button = React.createClass
  displayName: 'HeroTlogActions_DropdownMenu_Button'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="action-menu-button"
            onClick={ @props.onClick }>
      <i className="icon icon--dots" />
    </button>

module.exports = HeroTlogActions_DropdownMenu_Button