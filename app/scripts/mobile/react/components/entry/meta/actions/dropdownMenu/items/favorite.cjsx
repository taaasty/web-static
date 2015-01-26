i18n             = require 'i18next'
cx               = require 'react/lib/cx'
EntryViewActions = require '../../../../../../actions/view/entry'
{ PropTypes } = React

ADD_TO_FAVORITES_TITLE      = -> i18n.t 'add_to_favorites_entry_item'
REMOVE_FROM_FAVORITES_TITLE = -> i18n.t 'remove_from_favorites_entry_item'

EntryMetaActions_DropdownMenu_FavoriteItem = React.createClass
  displayName: 'EntryMetaActions_DropdownMenu_FavoriteItem'

  propTypes:
    favorited: PropTypes.bool.isRequired
    entryId:   PropTypes.number.isRequired

  getInitialState: ->
    favorited: @props.favorited

  render: ->
    iconClasses = cx
      'icon': true
      'icon--star': true
      'icon--star-fill': @isFavorited()

    <li className="meta-actions__dropdown-popup-item">
      <a className="meta-actions__dropdown-popup-link"
         onClick={ @handleClick }>
        <i className={ iconClasses } />
        <span>{ @getTitle() }</span>
      </a>
    </li>

  isFavorited: -> @state.favorited

  getTitle: ->
    if @isFavorited() then REMOVE_FROM_FAVORITES_TITLE() else ADD_TO_FAVORITES_TITLE()

  addToFavorites: ->
    EntryViewActions.addToFavorites @props.entryId
      .then => @setState(favorited: true)

  removeFromFavorites: ->
    EntryViewActions.removeFromFavorites @props.entryId
      .then => @setState(favorited: false)

  handleClick: ->
    if @isFavorited() then @removeFromFavorites() else @addToFavorites()

module.exports = EntryMetaActions_DropdownMenu_FavoriteItem