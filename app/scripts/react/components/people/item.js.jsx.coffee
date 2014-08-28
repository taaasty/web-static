###* @jsx React.DOM ###

window.PeopleItem = React.createClass

  propTypes:
    title:        React.PropTypes.string
    user:         React.PropTypes.object.isRequired
    relationship: React.PropTypes.object

  getInitialState: ->
    title: @props.title ? @props.user.title

  render: ->
    if @props.relationship? && @props.relationship.state != 'none'
      followStatus = `<FollowStatus status={ this.props.relationship.state } />`

    return `<article className="people-item">
              <div className="people-item__inner">
                <a className="people-item__link" href={ this.props.user.tlog_url }>
                  <div className="people-item__avatar">
                    <UserAvatar user={ this.props.user } />
                    { followStatus }
                  </div>
                  <h3 className="people-item__name">{ this.props.user.slug }</h3>
                  <p dangerouslySetInnerHTML={{ __html: this.state.title }}
                     className="people-item__desc" />
                </a>
              </div>
            </article>`