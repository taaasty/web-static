###* @jsx React.DOM ###

window.PersonsPopup_PersonItem = PersonsPopup_PersonItem = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired
    children: React.PropTypes.component.isRequired

  render: ->
   `<li className="person">
      <div className="person__in">
        <div className="person__avatar"> <UserAvatar user={this.props.user}/> </div>
        <div className="person__desc">
          <p className="person__name">{ this.props.user.name }</p>
          <div className="person__count">{ this.props.user.entries_count }</div>
        </div>
        <div className="person__actions">{this.props.children}</div>
      </div>
    </li>`

module.exports = PersonsPopup_PersonItem