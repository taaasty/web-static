window.HeroProfileStats_FollowingItem = React.createClass

  propTypes:
    relationship: React.PropTypes.object.isRequired

  render: ->
    <article className="user__item">
      <a className="user__link" href={ this.props.relationship.user.tlog_url } title={ this.props.relationship.user.name }>
        <span className="user__avatar">
          <UserAvatar user={ this.props.relationship.user }
                      size={ 64 } />
        </span>
        <span className="user__desc">
          <span className="user__name">{ this.props.relationship.user.name }</span>
        </span>
      </a>
    </article>