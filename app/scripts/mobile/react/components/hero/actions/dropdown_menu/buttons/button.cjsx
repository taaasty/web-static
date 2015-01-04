{ PropTypes } = React

HeroActions_DropdownMenu_Button = React.createClass
  displayName: 'HeroActions_DropdownMenu_Button'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="action-menu-button"
            onClick={ @props.onClick }>
      <i className="icon icon--dots" />
    </button>

module.exports = HeroActions_DropdownMenu_Button