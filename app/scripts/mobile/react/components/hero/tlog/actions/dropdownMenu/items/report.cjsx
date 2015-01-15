RelationshipViewActions = require '../../../../../../actions/view/relationship'
{ PropTypes } = React

#TODO: i18n
TITLE = 'Пожаловаться'

HeroActions_DropdownMenuReportItem = React.createClass
  displayName: 'HeroActions_DropdownMenuReportItem'

  propTypes:
    userId:   PropTypes.number.isRequired
    onReport: PropTypes.func.isRequired

  render: ->
    <li className="hero__dropdown-popup-item"
        onClick={ @report }>
      <a className="hero__dropdown-popup-link">
        <i className="icon icon--exclamation-mark" />
        <span>{ TITLE }</span>
      </a>
    </li>

  report: ->
    RelationshipViewActions.report @props.userId
      .always @props.onReport

module.exports = HeroActions_DropdownMenuReportItem