RelationshipViewActions = require '../../../../../../actions/view/relationship'
{ PropTypes } = React

HeroTlogActions_DropdownMenuIgnoreItem = React.createClass
  displayName: 'HeroTlogActions_DropdownMenuIgnoreItem'

  propTypes:
    userId:   PropTypes.number.isRequired
    onIgnore: PropTypes.func.isRequired

  render: ->
    <li className="hero__dropdown-popup-item"
        onClick={ @ignore }>
      <a className="hero__dropdown-popup-link">
        <i className="icon icon--not-allowed" />
        <span>{ i18n.t('hero.ignore_tlog_item') }</span>
      </a>
    </li>

  ignore: ->
    RelationshipViewActions.ignore @props.userId
      .then @props.onIgnore

module.exports = HeroTlogActions_DropdownMenuIgnoreItem