###* @jsx React.DOM ###

# Ex .js-subscribe handler
#
module.experts = window.FollowButton = React.createClass
  propTypes:
    isFollow: React.PropTypes.bool
    tlogId:   React.PropTypes.number
    #followStatusEl: React.PropTypes.object

  #getDefaultProps: ->
    #followStatusEl: $(".js-follow-status")

  getInitialState: (a,b,c)->
    isFollow:       @props.isFollow
    isHover:        false
    isError:        false

  updateFollowElement: ->
    return unless @props.followStatusEl

    @props.followStatusEl.toggleClass "state--hidden", @state.isFollow

  componentWillUnmount: ->
    @clearTimer()

  clearTimer: ->
    clearInterval @interval if @interval

  setTimer: ->
    clearError = =>
      @setState isError: false
    @interval = setInterval clearError, 1000

  handleClick: (e)->
    newState = ! @state.isFollow
    @setState isError: false
    @clearTimer()

    $.ajax
      withCredentials: true
      url:     Routes.api.followings_url(@props.tlogId)
      method:  if newState then method = 'POST' else method = 'DELETE'
      success: =>
        @setState isFollow: newState
        @updateFollowElement()

      error: (respond)=>
        @setState isError: true
        @setTimer()

  handleHover: -> @setState isHover: true
  handleBlur:  -> @setState isHover: false

  render: ->
    if @state.isFollow
      rootClass  = 'state--active'
      text       = if @state.isHover then 'Отписаться' else 'Подписан'
      childClass = 'button__text--subscribe'
    else
      rootClass  = ''
      text       = 'Подписаться'
      childClass = 'button__text--subscribed'

    text = 'ошибка' if @state.isError

    return `<span className={"button follow-button button--small " + rootClass}
                  onClick={this.handleClick}
                  onMouseOver={this.handleHover}
                  onMouseLeave={this.handleBlur}>
        <span className="button__inner">
          <span className={"button__text " + childClass}>{text}</span>
        </span>
      </span>`
