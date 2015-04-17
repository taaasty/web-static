classnames = require 'classnames'

window.EntryMetabarDropdownMenuFavoriteItem = React.createClass
  mixins: [RequesterMixin, DOMManipulationsMixin, ComponentManipulationsMixin]

  propTypes:
    isFavorited:              React.PropTypes.bool.isRequired
    entryId:                  React.PropTypes.number.isRequired
    shouldRemoveFavoriteNode: React.PropTypes.bool

  getInitialState: ->
    isFavorited: @props.isFavorited
    isHover:     false

  render: ->
    iconClasses = classnames('icon', 'icon--star', {
      'icon--star-fill': @state.isFavorited
    })

    return <a onClick={ this.onClick }
              onMouseEnter={ this.onMouseEnter }
              onMouseLeave={ this.onMouseLeave }
              className="meta-item__dropdown-item">
             <i className={ iconClasses } />
             { this.getTitle() }
           </a>

  getTitle: ->
    if @state.isFavorited
      if @state.isHover then i18n.t 'remove_from_favorites_entry_item' else i18n.t 'entry_in_favorites'
    else
      i18n.t 'add_to_favorites_entry_item'

  onClick: (e) ->
    e.stopPropagation()
    e.preventDefault()

    if @state.isFavorited
      @removeFromFavorites()
    else
      @addToFavorites()

  addToFavorites: ->
    @createRequest
      url: ApiRoutes.favorites_url()
      method: 'POST'
      data:
        entry_id: @props.entryId
      success: =>
        @safeUpdateState isFavorited: true
        console.info "Пост #{@props.entryId} добавлен в избранное"
      error: (data) ->
        TastyNotifyController.errorResponse data

  removeFromFavorites: ->
    @createRequest
      url: ApiRoutes.favorites_url()
      method: 'POST'
      data:
        _method: 'DELETE'
        entry_id: @props.entryId
      success: =>
        if @props.shouldRemoveFavoriteNode
          @removeEntryFromDOM @props.entryId
        else
          @safeUpdateState isFavorited: false
        console.info "Пост #{@props.entryId} удалён из избранного"
      error: (data) ->
        TastyNotifyController.errorResponse data

  onMouseEnter: -> @setState isHover: true
  onMouseLeave: -> @setState isHover: false