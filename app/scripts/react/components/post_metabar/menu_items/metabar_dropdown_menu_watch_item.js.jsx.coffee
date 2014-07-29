###* @jsx React.DOM ###

window.MetabarDropdownMenuWatchItem = React.createClass

  propTypes:
    entryId:    React.PropTypes.number.isRequired
    isWatching: React.PropTypes.bool.isRequired
    title:      React.PropTypes.string.isRequired

  getInitialState: ->
    isWatching: @props.isWatching ? false
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
      'Подписаться'

  onClick: (e) ->
    e.stopPropagation()
    e.preventDefault()

    @setState isWatching: !@state.isWatching
    if !@state.isWatching
      console.info "Оформлена подписка на комментарии поста #{@props.entryId}"
    else
      console.info "Отменена подписка на комментарии поста #{@props.entryId}"

  onMouseEnter: -> @setState isHover: true
  onMouseLeave: -> @setState isHover: false