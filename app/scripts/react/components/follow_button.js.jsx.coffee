###* @jsx React.DOM ###

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
    isProcess:      true

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
    @setState isError: false, isProcess: true
    @clearTimer()

    $.ajax
      #withCredentials: true
      url:     Routes.api.followings_url(@props.tlogId)
      method:  if newState then method = 'POST' else method = 'DELETE'
      success: =>
        @setState isFollow: newState, isProcess: false
        @updateFollowElement()

      error: (data)=>
        TastyNotifyController.errorResponse data
        @setState isError: true, isProcess: false
        @setTimer()

  handleHover: -> @setState isHover: true
  handleBlur:  -> @setState isHover: false

  render: ->
    if @state.isFollow
      rootClass  = 'state--active'
      text       = if @state.isHover then 'Отписаться' else 'Подписан'
    else
      rootClass  = ''
      text       = 'Подписаться'

    text = 'ошибка' if @state.isError

    return `<button className={"button follow-button button--small " + rootClass}
                  onClick={this.handleClick}
                  onMouseOver={this.handleHover}
                  onMouseLeave={this.handleBlur}>
              {text}
            </button>`
