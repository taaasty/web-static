###* @jsx React.DOM ###

window.PeopleItem = React.createClass

  propTypes:
    user:         React.PropTypes.object.isRequired
    relationship: React.PropTypes.object.isRequired

  render: ->
   `<article className="people-item">
      <div className="people-item__inner">
        <a className="people-item__link" href={ this.props.user.tlog_url }>
          <div className="people-item__avatar">
            <UserAvatar user={ this.props.user } />
            <SmartFollowStatus tlogId={ this.props.user.id }
                               status={ this.props.relationship.state } />
          </div>
          <h3 className="people-item__name">{ this.props.user.slug }</h3>
          <p className="people-item__desc">{ this.props.user.title }</p>
        </a>
      </div>
    </article>`