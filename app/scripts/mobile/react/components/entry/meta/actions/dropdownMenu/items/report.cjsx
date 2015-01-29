EntryViewActions = require '../../../../../../actions/view/entry'
{ PropTypes } = React

EntryMetaActions_DropdownMenu_ReportItem = React.createClass
  displayName: 'EntryMetaActions_DropdownMenu_ReportItem'

  propTypes:
    entryId: PropTypes.number.isRequired

  render: ->
    <li className="meta-actions__dropdown-popup-item">
      <a className="meta-actions__dropdown-popup-link"
         onClick={ @handleClick }>
        <i className="icon icon--exclamation-mark" />
        <span>{ i18n.t('report_entry_item') }</span>
      </a>
    </li>

  report: ->
    EntryViewActions.report @props.entryId

  handleClick: ->
    @report() if confirm i18n.t 'report_entry_confirm'

module.exports = EntryMetaActions_DropdownMenu_ReportItem