###* @jsx React.DOM ###

window.PersonsTabPanelItem = PersonsTabPanelItem = React.createClass

  propTypes:
    person: React.PropTypes.object.isRequired

  render: ->
   `<li className="person">
      <div className="person__in">
        <div className="person__avatar">
          <span className="avatar avatar--seventh">
            <span className="avatar__text">{ this.props.person.avatarText }</span>
          </span>
        </div>
        <div className="person__desc">
          <p className="person__name">{ this.props.person.name }</p>
          <div className="person__count">{ this.props.person.count }</div>
        </div>
        <div className="person__actions">
          <FollowButton followUserID={ this.props.person.followUserID }
                        isFollow={ this.props.person.isFollow }>
          </FollowButton>
        </div>
      </div>
    </li>`

module.exports = PersonsTabPanelItem