classnames = require 'classnames'
EntryViewActions = require '../../../../../../actions/view/entry'
{ PropTypes } = React

EntryMetaActions_DropdownMenu_FavoriteItem = React.createClass
  displayName: 'EntryMetaActions_DropdownMenu_FavoriteItem'

  propTypes:
    favorited: PropTypes.bool.isRequired
    entryId:   PropTypes.number.isRequired

  getInitialState: ->
    favorited: @props.favorited

  render: ->
    iconClasses = classnames('icon', 'icon--star', {
      'icon--star-fill': @isFavorited()
    })  

    <li className="meta-actions__dropdown-popup-item">
      <a className="meta-actions__dropdown-popup-link"
         onClick={ @handleClick }>
        <i className={ iconClasses } />
        <span>{ @getTitle() }</span>
      </a>
    </li>

  isFavorited: -> @state.favorited

  getTitle: ->
    if @isFavorited() then i18n.t 'entry.remove_from_favorites_item' else i18n.t 'entry.add_to_favorites_item'

  addToFavorites: ->
    EntryViewActions.addToFavorites @props.entryId
      .then => @setState(favorited: true)

  removeFromFavorites: ->
    EntryViewActions.removeFromFavorites @props.entryId
      .then => @setState(favorited: false)

  handleClick: ->
    if @isFavorited() then @removeFromFavorites() else @addToFavorites()

module.exports = EntryMetaActions_DropdownMenu_FavoriteItem