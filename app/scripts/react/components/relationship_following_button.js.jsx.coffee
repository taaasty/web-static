###* @jsx React.DOM ###

STATE_FRIEND  = 'friend'
STATE_NONE    = 'none'
STATE_UNKNOWN = 'unknown'

module.experts = window.RelationshipFollowingButton = React.createClass
  mixins:        [ErrorTimerMixin]
  propTypes:
    relationship: React.PropTypes.object
    #followStatusEl: React.PropTypes.object

  #getDefaultProps: ->
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

    return `<button className={"button follow-button button--small " + rootClass}
                  onClick={this.handleClick}
                  onMouseOver={this.handleHover}
                  onMouseLeave={this.handleBlur}>
              {this.title()}
            </button>`

  title: ->
    return 'ошибка' if @state.isError
    return 'в процессе..' if @state.isProcess

    if @state.isHover
      return switch @state.relationship.state
        when 'friend'
          'Отписаться'
        when 'guessed'
          'Отменить запрос'
        when 'ignored'
          'Разболкировать'
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

    switch @state.relationship.state
      when 'friend'
        action = 'unfollow'
      when 'guessed'
        action = 'cancel'
      else
        action = 'follow'

    xhr = $.ajax
      url:     Routes.api.change_my_relationship_url(@props.relationship.user_id, action)
      method:  'POST'
      success: (data) =>
        @setState relationship: data
      error: (data)=>
        TastyNotifyController.errorResponse data
        @startErrorTimer()

    xhr.always =>
      @setState isProcess: false

  handleHover: -> @setState isHover: true
  handleBlur:  -> @setState isHover: false


