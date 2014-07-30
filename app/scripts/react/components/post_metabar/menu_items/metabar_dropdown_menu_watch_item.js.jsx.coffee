###* @jsx React.DOM ###

window.MetabarDropdownMenuWatchItem = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    entryId:    React.PropTypes.number.isRequired
    isWatching: React.PropTypes.bool.isRequired

  getInitialState: ->
    isWatching: @props.isWatching
    isHover:    false

  render: ->
    `<a onClick={ this.onClick }
        onMouseEnter={ this.onMouseEnter }
        onMouseLeave={ this.onMouseLeave }
        className="meta-item__dropdown-item">
      <i className="icon icon--comments-subscribe"></i>
      { this.getTitle() }
    </a>`

  getTitle: ->
    if @state.isWatching
      if @state.isHover then 'Отписаться' else 'Подписан'
    else
      'Подписаться на комментарии'

  onClick: (e) ->
    e.stopPropagation()
    e.preventDefault()

    if @state.isWatching
      @removeFromWatching()
    else
      @addToWatching()

  addToWatching: ->
    @createRequest
      url: Routes.api.watching_url()
      method: 'POST'
      data:
        entry_id: @props.entryId
      success: =>
        @safeUpdateState => @setState isWatching: true
        console.info "Оформлена подписка на комментарии поста #{@props.entryId}"
      error: (data) ->
        TastyNotifyController.errorResponse data

  removeFromWatching: ->
    @createRequest
      url: Routes.api.watching_url()
      method: 'DELETE'
      data:
        entry_id: @props.entryId
      success: =>
        @safeUpdateState => @setState isWatching: false
        console.info "Отменена подписка на комментарии поста #{@props.entryId}"
      error: (data) ->
        TastyNotifyController.errorResponse data

  onMouseEnter: -> @setState isHover: true
  onMouseLeave: -> @setState isHover: false