###* @jsx React.DOM ###

window.PersonsPopup_FollowerRelationship = PersonsPopup_FollowerRelationship = React.createClass

  propTypes:
    relationship: React.PropTypes.object.isRequired

  render: ->
   `<li className="person">
      <div className="person__in">
        <div className="person__avatar">
          <Avatar name={this.props.relationship.reader.name} userpic={this.props.relationship.reader.userpic}/>
        </div>
        <div className="person__desc">
          <p className="person__name">{ this.props.relationship.reader.name }</p>
          <div className="person__count">{ this.props.relationship.reader.count }</div>
        </div>
        <div className="person__actions">
          <FollowButton tlogId={ this.props.relationship.reader.id }
                        relationship={ this.props.relationship }>
          </FollowButton>
        </div>
      </div>
    </li>`

module.exports = PersonsPopup_FollowerRelationship