RelationshipViewActions = require '../../../../../../actions/view/relationship'
{ PropTypes } = React

HeroTlogActions_DropdownMenuReportItem = React.createClass
  displayName: 'HeroTlogActions_DropdownMenuReportItem'

  propTypes:
    userId:   PropTypes.number.isRequired
    onReport: PropTypes.func.isRequired

  render: ->
    <li className="hero__dropdown-popup-item"
        onClick={ @report }>
      <a className="hero__dropdown-popup-link">
        <i className="icon icon--exclamation-mark" />
        <span>{ i18n.t('hero.report_tlog_item') }</span>
      </a>
    </li>

  report: ->
    RelationshipViewActions.report @props.userId
      .always @props.onReport

module.exports = HeroTlogActions_DropdownMenuReportItem