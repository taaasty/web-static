###* @jsx React.DOM ###

window.HeroProfileStats_FollowerItem = React.createClass

  propTypes:
    relationship: React.PropTypes.object.isRequired

  render: ->
    `<article className="user__item">
      <a className="user__link" href={ this.props.relationship.reader.tlog_url } title={ this.props.relationship.reader.name }>
        <span className="user__avatar">
          <UserAvatar user={ this.props.relationship.reader }
                      size={ 64 } />
        </span>
        <span className="user__desc">
          <span className="user__name">{ this.props.relationship.reader.name }</span>
        </span>
      </a>
    </article>`