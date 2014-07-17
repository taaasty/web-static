###* @jsx React.DOM ###

window.PersonsPopup_IgnoredRelationship = React.createClass

  propTypes:
    relationship: React.PropTypes.object.isRequired

  render: ->
   `<li className="person">
      <div className="person__in">
        <div className="person__avatar">
          <Avatar name={this.props.relationship.user.name} userpic={this.props.relationship.user.userpic}/>
        </div>
        <div className="person__desc">
          <p className="person__name">{ this.props.relationship.user.name }</p>
          <div className="person__count">{ this.props.relationship.user.count }</div>
        </div>
        <div className="person__actions">
          <RelationshipFollowingButton relationship={ this.props.relationship } />
        </div>
      </div>
    </li>`

module.exports = PersonsPopup_FollowingRelationship

