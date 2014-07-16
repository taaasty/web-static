###* @jsx React.DOM ###

window.FollowersTabPanelItem = FollowersTabPanelItem = React.createClass

  propTypes:
    person: React.PropTypes.object.isRequired

  render: ->
   `<li className="person">
      <div className="person__in">
        <div className="person__avatar">
          <Avatar name={this.props.person.reader.name} userpic={this.props.person.reader.userpic}/>
        </div>
        <div className="person__desc">
          <p className="person__name">{ this.props.person.reader.name }</p>
          <div className="person__count">{ this.props.person.reader.count }</div>
        </div>
        <div className="person__actions">
          <FollowButton followUserID={ this.props.person.reader.id }
                        isFollow={ !!this.props.person.status }>
          </FollowButton>
        </div>
      </div>
    </li>`

module.exports = FollowersTabPanelItem