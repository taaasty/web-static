TITLE = 'Добавить в избранное'

module.exports = React.createClass
  displayName: 'EntryMetaActions_DropdownMenuFavoriteItem'

  render: ->
    <li className="meta-actions__dropdown-popup-item">
      <a className="meta-actions__dropdown-popup-link"
         onClick={ @addToFavorite }>
        <i className="icon icon--star" />
        <span>{ TITLE }</span>
      </a>
    </li>

  addToFavorite: (e) ->
    e.preventDefault()
    console.log 'add to favorite'