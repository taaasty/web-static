###* @jsx React.DOM ###

STATE_FRIEND  = 'friend'
STATE_NONE    = 'none'
STATE_UNKNOWN = 'unknown'

module.experts = window.RelationshipFollowingButton = React.createClass
  mixins:        [ErrorTimer]
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
    if @isFollow()
      rootClass  = 'state--active'
      text       = if @state.isHover then 'Отписаться' else 'Подписан'
    else
      rootClass  = ''
      text       = 'Подписаться'

    text = 'в процессе..' if @state.isProcess

    text = 'ошибка' if @state.isError

    return `<button className={"button follow-button button--small " + rootClass}
                  onClick={this.handleClick}
                  onMouseOver={this.handleHover}
                  onMouseLeave={this.handleBlur}>
              {text}
            </button>`

  isFollow: ->
    @state.relationship.state == STATE_FRIEND

  handleClick: (e)->
    @closeError()
    @setState isProcess: true

    relationState = if @isFollow() then 'unfollow' else 'follow'

    $.ajax
      url:     Routes.api.change_my_relationship_url(@props.relationship.user_id, relationState)
      method:  'POST'
      success: (data) =>
        @setState relationship: data
      error: (data)=>
        debugger
        TastyNotifyController.errorResponse data
        @startErrorTimer()
      done: =>
        debugger
        @setState isProcess: false

  handleHover: -> @setState isHover: true
  handleBlur:  -> @setState isHover: false


