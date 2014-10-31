###* @jsx React.DOM ###

HERO_AVATAR_SIZE = 220

window.HeroProfileAvatar = React.createClass

  propTypes:
    user:    React.PropTypes.object.isRequired
    onClick: React.PropTypes.func.isRequired

  render: ->
   `<a href={ this.props.user.tlog_url }
       onClick={ this.handleClick }>
      <div className="hero__avatar">
        <UserAvatar user={ this.props.user }
                    size={ HERO_AVATAR_SIZE } />
      </div>
    </a>`

  handleClick: (e) ->
    e.preventDefault()

    @props.onClick()