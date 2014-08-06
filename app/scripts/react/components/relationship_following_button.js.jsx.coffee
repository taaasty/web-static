###* @jsx React.DOM ###

STATE_FRIEND  = 'friend'
STATE_NONE    = 'none'
STATE_UNKNOWN = 'unknown'

module.experts = window.RelationshipFollowingButton = React.createClass
  mixins: [ErrorTimerMixin, RequesterMixin]

  propTypes:
    relationship: React.PropTypes.object.isRequired
    ignoringOnly: React.PropTypes.bool


  getDefaultProps: ->
    ignoringOnly: false

    #followStatusEl: $(".js-follow-status")

  getInitialState: (a,b,c)->
    relationship:   @props.relationship
    isHover:        false
    isError:        false
    isProcess:      false

  componentWillUnmount: -> @clearErrorTimer()

  render: ->
    if @isFollow() && !@state.isError && !@state.isProcess
      rootClass  = 'state--active'
    else
      rootClass  = ''

    return `<button className={"follow-button " + rootClass}
                  onClick={this.handleClick}
                  onMouseOver={this.handleHover}
                  onMouseLeave={this.handleBlur}>
              {this.title()}
            </button>`

  title: ->
    return 'ошибка' if @state.isError
    return 'в процессе..' if @state.isProcess

    if @props.ignoringOnly
      @titleIgnoring()
    else
      @titleFollowing()

  titleIgnoring: ->
    if @state.isHover
      return switch @state.relationship.state
        when 'ignored'
          'Разблокировать'
        else
          'Заблокировать'
    else
      return switch @state.relationship.state
        when 'ignored'
          'Заблокирован'
        else
          'Заблокировать'

  titleFollowing: ->

    if @state.isHover
      return switch @state.relationship.state
        when 'friend'
          'Отписаться'
        when 'guessed'
          'Отменить запрос'
        when 'ignored'
          'Разблокировать'
        else
          'Подписаться'
    else
      return switch @state.relationship.state
        when 'friend'
          'Подписан'
        when 'guessed'
          'Ждем одобрения'
        when 'ignored'
          'Заблокирован'
        else
          'Подписаться'

  isFollow: ->
    @state.relationship.state == STATE_FRIEND

  handleClick: (e)->
    @closeError()
    return unless @state.relationship?

    @setState isProcess: true

    if @props.ignoringOnly
      switch @state.relationship.state
        when 'ignored'
          action = 'cancel'
        else
          action = 'ignore'
    else
      switch @state.relationship.state
        when 'friend'
          action = 'unfollow'
        when 'guessed'
          action = 'cancel'
        else
          action = 'follow'

    @createRequest
      url: Routes.api.change_my_relationship_url(@props.relationship.user_id, action)
      method: 'POST'
      success: (data) =>
        @safeUpdateState => @setState relationship: data
        TastyEvents.trigger TastyEvents.keys.follow_status_changed(data.user_id), [data.state]
      error: (data) =>
        @safeUpdateState => @setState isError: true
        TastyNotifyController.errorResponse data
        @startErrorTimer()
      complete: =>
        @safeUpdateState => @setState isProcess: false

  handleHover: -> @setState isHover: true
  handleBlur:  -> @setState isHover: false


module.experts = window.RelationshipIgnoreButton = React.createClass
  propTypes:
    relationship: React.PropTypes.object.isRequired

  render: ->
    RelationshipFollowingButton relationship: @props.relationship, ignoringOnly: true

