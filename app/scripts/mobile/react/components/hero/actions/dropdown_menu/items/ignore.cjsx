RelationshipViewActions = require '../../../../../actions/view/relationship'
{ PropTypes } = React

#TODO: i18n
TITLE = 'Заблокировать'

module.exports = React.createClass
  displayName: 'HeroActions_DropdownMenuIgnoreItem'

  propTypes:
    userId:   PropTypes.number.isRequired
    onIgnore: PropTypes.func.isRequired

  render: ->
    <li className="hero__dropdown-popup-item"
        onClick={ @ignore }>
      <a className="hero__dropdown-popup-link">
        <i className="icon icon--not-allowed" />
        <span>{ TITLE }</span>
      </a>
    </li>

  ignore: ->
    RelationshipViewActions.ignore @props.userId
      .then @props.onIgnore