TITLE = 'Пожаловаться'

module.exports = React.createClass
  displayName: 'EntryMetaActions_DropdownMenuReportItem'

  render: ->
    <li className="meta-actions__dropdown-popup-item">
      <a className="meta-actions__dropdown-popup-link"
         onClick={ @report }>
        <i className="icon icon--exclamation-mark" />
        <span>{ TITLE }</span>
      </a>
    </li>

  report: (e) ->
    e.preventDefault()
    console.log 'report'