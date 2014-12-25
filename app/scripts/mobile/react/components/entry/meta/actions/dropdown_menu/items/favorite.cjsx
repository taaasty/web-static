cx               = require 'react/lib/cx'
EntryViewActions = require '../../../../../../actions/view/entry'
{ PropTypes } = React

#TODO: i18n
ADD_TO_FAVORITES_TITLE      = 'Добавить в избранное'
REMOVE_FROM_FAVORITES_TITLE = 'Удалить из избранного'

module.exports = React.createClass
  displayName: 'EntryMetaActions_DropdownMenuFavoriteItem'

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
    if @isFavorited() then REMOVE_FROM_FAVORITES_TITLE else ADD_TO_FAVORITES_TITLE

  addToFavorites: ->
    EntryViewActions.addToFavorites @props.entryId
      .then => @setState(favorited: true)

  removeFromFavorites: ->
    EntryViewActions.removeFromFavorites @props.entryId
      .then => @setState(favorited: false)

  handleClick: (e) ->
    e.preventDefault()
    e.stopPropagation()
    if @isFavorited() then @removeFromFavorites() else @addToFavorites()