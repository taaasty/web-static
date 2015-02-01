window.EntryMetabarDropdownMenuWatchItem = React.createClass
  mixins: [RequesterMixin, ComponentManipulationsMixin]

  propTypes:
    entryId:    React.PropTypes.number.isRequired
    isWatching: React.PropTypes.bool.isRequired

  getInitialState: ->
    isWatching: @props.isWatching
    isHover:    false

  render: ->
    <a onClick={ this.onClick }
        onMouseEnter={ this.onMouseEnter }
        onMouseLeave={ this.onMouseLeave }
        className="meta-item__dropdown-item">
      <i className="icon icon--comments-subscribe" />
      { this.getTitle() }
    </a>

  getTitle: ->
    if @state.isWatching
      if @state.isHover then i18n.t 'stop_watch_entry_item' else i18n.t 'watching_entry_item'
    else
      i18n.t 'start_watch_entry_item'

  onClick: (e) ->
    e.stopPropagation()
    e.preventDefault()

    if @state.isWatching then @removeFromWatching() else @addToWatching()

  addToWatching: ->
    @createRequest
      url: ApiRoutes.watching_url()
      method: 'POST'
      data:
        entry_id: @props.entryId
      success: =>
        @safeUpdateState isWatching: true
        console.info "Оформлена подписка на комментарии поста #{@props.entryId}"
      error: (data) ->
        TastyNotifyController.errorResponse data

  removeFromWatching: ->
    @createRequest
      url: ApiRoutes.watching_url()
      method: 'POST'
      data:
        _method: 'DELETE'
        entry_id: @props.entryId
      success: =>
        @safeUpdateState isWatching: false
        console.info "Отменена подписка на комментарии поста #{@props.entryId}"
      error: (data) ->
        TastyNotifyController.errorResponse data

  onMouseEnter: -> @setState isHover: true
  onMouseLeave: -> @setState isHover: false