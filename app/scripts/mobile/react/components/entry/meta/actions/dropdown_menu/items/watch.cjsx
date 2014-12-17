TITLE = 'Подписаться на комментарии'

module.exports = React.createClass
  displayName: 'EntryMetaActions_DropdownMenuWatchItem'

  render: ->
    <li className="meta-actions__dropdown-popup-item">
      <a className="meta-actions__dropdown-popup-link"
         onClick={ @watch }>
        <i className="icon icon--comments-subscribe" />
        <span>{ TITLE }</span>
      </a>
    </li>

  watch: (e) ->
    e.preventDefault()
    console.log 'watch'