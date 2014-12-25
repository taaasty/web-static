EntryViewActions = require '../../../../../../actions/view/entry'
{ PropTypes } = React

#TODO: i18n
TITLE           = 'Пожаловаться'
CONFIRM_MESSAGE = 'Вы действительно хотите пожаловаться на пост?'

module.exports = React.createClass
  displayName: 'EntryMetaActions_DropdownMenuReportItem'

  propTypes:
    entryId: PropTypes.number.isRequired

  render: ->
    <li className="meta-actions__dropdown-popup-item">
      <a className="meta-actions__dropdown-popup-link"
         onClick={ @handleClick }>
        <i className="icon icon--exclamation-mark" />
        <span>{ TITLE }</span>
      </a>
    </li>

  report: ->
    EntryViewActions.report @props.entryId

  handleClick: (e) ->
    e.preventDefault()
    e.stopPropagation()
    @report() if confirm CONFIRM_MESSAGE