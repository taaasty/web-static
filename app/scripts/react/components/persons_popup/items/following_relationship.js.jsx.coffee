###* @jsx React.DOM ###

window.PersonsPopup_FollowingRelationship = React.createClass

  propTypes:
    relationship: React.PropTypes.object.isRequired

  render: ->
    `<PersonsPopup_PersonItem user={this.props.relationship.user}>
      <RelationshipFollowingButton relationship={ this.props.relationship } />
      </PersonsPopup_PersonItem>`
