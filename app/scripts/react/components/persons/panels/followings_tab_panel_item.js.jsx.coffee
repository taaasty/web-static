###* @jsx React.DOM ###

window.FollowingsTabPanelItem = FollowingsTabPanelItem = React.createClass

  propTypes:
    person: React.PropTypes.object.isRequired

  render: ->
   `<li className="person">
      <div className="person__in">
        <div className="person__avatar">
          <Avatar name={this.props.person.user.name} userpic={this.props.person.user.userpic}/>
        </div>
        <div className="person__desc">
          <p className="person__name">{ this.props.person.user.name }</p>
          <div className="person__count">{ this.props.person.user.count }</div>
        </div>
        <div className="person__actions">
          <FollowButton tlogId={ this.props.person.user.id }
                        isFollow={ !!this.props.person.status }>
          </FollowButton>
        </div>
      </div>
    </li>`

module.exports = FollowingsTabPanelItem