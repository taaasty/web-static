###* @jsx React.DOM ###

# Ex .js-subscribe handler
#
window.FollowButton = React.createClass
  getInitialState: (a,b,c)->
    isFollow:       @props.isFollow
    isHover:        false

  handleClick: (e)->
    newState = ! @state.isFollow
    @setState isHover: false

    $.ajax
      url:     Routes.api.followings_url()
      method:  if newState then method = 'POST' else method = 'DELETE'
      data:
        follower_id: @props.followUserID
      success: =>
        @setState isFollow: newState
        $(".js-follow-status").toggleClass "state--hidden", @state.isFollow

  handleHover: -> @setState isHover: true
  handleBlur:  -> @setState isHover: false
  render: ->

    if !@state.isFollow
      rootClass  = ''
      text       = 'Подписаться'
      childClass = 'button__text--subscribed'
    else
      rootClass  = 'state--active'
      text       = if @state.isHover then 'Отписаться' else 'Подписан'
      childClass = 'button__text--subscribe'

    return `<span className={"button follow-button button--small " + rootClass}
                  onClick={this.handleClick}
                  onMouseOver={this.handleHover}
                  onMouseLeave={this.handleBlur}>
        <span className="button__inner">
          <span className={"button__text " + childClass}>{text}</span>
        </span>
      </span>`
