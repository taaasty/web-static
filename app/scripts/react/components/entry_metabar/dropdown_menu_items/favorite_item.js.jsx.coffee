###* @jsx React.DOM ###

window.EntryMetabarDropdownMenuFavoriteItem = React.createClass
  mixins: [RequesterMixin, DOMManipulationsMixin]

  propTypes:
    isFavorited:              React.PropTypes.bool.isRequired
    entryId:                  React.PropTypes.number.isRequired
    shouldRemoveFavoriteNode: React.PropTypes.bool

  getInitialState: ->
    isFavorited: @props.isFavorited
    isHover:     false

  render: ->
    iconClasses = React.addons.classSet {
      'icon': true
      'icon--star': true
      'icon--star-fill': @state.isFavorited
    }

    return `<a onClick={ this.onClick }
               onMouseEnter={ this.onMouseEnter }
               onMouseLeave={ this.onMouseLeave }
               className="meta-item__dropdown-item">
              <i className={ iconClasses }></i>
              { this.getTitle() }
            </a>`

  getTitle: ->
    if @state.isFavorited
      if @state.isHover then 'Удалить из избранного' else 'В избранном'
    else
      'Добавить в избранное'

  onClick: (e) ->
    e.stopPropagation()
    e.preventDefault()

    if @state.isFavorited
      @removeFromFavorites()
    else
      @addToFavorites()

  addToFavorites: ->
    @createRequest
      url: Routes.api.favorites_url()
      method: 'POST'
      data:
        entry_id: @props.entryId
      success: =>
        @safeUpdateState => @setState isFavorited: true
        console.info "Пост #{@props.entryId} добавлен в избранное"
      error: (data) ->
        TastyNotifyController.errorResponse data

  removeFromFavorites: ->
    @createRequest
      url: Routes.api.favorites_url()
      method: 'DELETE'
      data:
        entry_id: @props.entryId
      success: =>
        if @props.shouldRemoveFavoriteNode
          @removeEntryFromDOM @props.entryId
        else
          @safeUpdateState => @setState isFavorited: false
        console.info "Пост #{@props.entryId} удалён из избранного"
      error: (data) ->
        TastyNotifyController.errorResponse data

  onMouseEnter: -> @setState isHover: true
  onMouseLeave: -> @setState isHover: false