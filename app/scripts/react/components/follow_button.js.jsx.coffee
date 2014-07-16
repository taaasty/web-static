###* @jsx React.DOM ###

STATE_FRIEND  = 'friend'
STATE_NONE    = 'none'
STATE_UNKNOWN = 'unknown'

module.experts = window.FollowButton = React.createClass
  propTypes:
    tlogId:       React.PropTypes.number.isRequired
    relationship: React.PropTypes.object
    #followStatusEl: React.PropTypes.object

  #getDefaultProps: ->
    #followStatusEl: $(".js-follow-status")

  getInitialState: (a,b,c)->
    relationship:   @props.relationship
    isHover:        false
    isError:        false
    isProcess:      true

  isFollow: ->
    @state.relationship.state == STATE_FRIEND

  componentDidMount: ->

    unless @state.relationship?
      @setState isError: false, isProcess: true
      $.ajax
        url:     Routes.api.get_my_relationship_url(@props.tlogId)
        success: (data) =>
          @setState relationship: data, isProcess: false

        error: (data)=>
          TastyNotifyController.errorResponse data
          @setState isError: true, isProcess: false
          @setTimer()

  componentDidUpdate: ->
    return unless @props.followStatusEl
    @props.followStatusEl.toggleClass "state--hidden", @isFollow()

  componentWillUnmount: ->
    @clearTimer()

  clearTimer: ->
    clearInterval @interval if @interval

  setTimer: ->
    clearError = =>
      @setState isError: false
    @interval = setInterval clearError, 1000

  handleClick: (e)->
    @setState isError: false, isProcess: true
    @clearTimer()

    relationState = if @isFollow() then 'unfollow' else 'follow'

    $.ajax
      url:     Routes.api.change_my_relationship_url(@props.tlogId, relationState)
      method:  'POST'
      success: (data) =>
        @setState relationship: data, isProcess: false

      error: (data)=>
        TastyNotifyController.errorResponse data
        @setState isError: true, isProcess: false
        @setTimer()

  handleHover: -> @setState isHover: true
  handleBlur:  -> @setState isHover: false

  render: ->
    if @state.relationship?
      if @isFollow()
        rootClass  = 'state--active'
        text       = if @state.isHover then 'Отписаться' else 'Подписан'
      else
        rootClass  = ''
        text       = 'Подписаться'

      text = 'в процессе..' if @state.isProcess
    else
      text = 'узнаю..'



    text = 'ошибка' if @state.isError

    return `<button className={"button follow-button button--small " + rootClass}
                  onClick={this.handleClick}
                  onMouseOver={this.handleHover}
                  onMouseLeave={this.handleBlur}>
              {text}
            </button>`
