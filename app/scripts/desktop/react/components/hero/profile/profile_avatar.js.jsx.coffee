###* @jsx React.DOM ###

HERO_AVATAR_SIZE = 220

window.HeroProfileAvatar = React.createClass

  propTypes:
    user:    React.PropTypes.object.isRequired
    onClick: React.PropTypes.func.isRequired

  render: ->
   `<a href={ this.props.user.tlog_url }
       onClick={ this.props.onClick }>
      <div className="hero__avatar">
        <UserAvatar user={ this.props.user }
                    size={ HERO_AVATAR_SIZE } />
      </div>
    </a>`