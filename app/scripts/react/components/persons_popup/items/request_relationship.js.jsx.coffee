###* @jsx React.DOM ###

window.PersonsPopup_RequestRelationship = PersonsPopup_RequestRelationship = React.createClass

  propTypes:
    relationship: React.PropTypes.object.isRequired

  render: ->
    `<PersonsPopup_PersonItem user={this.props.relationship.user}>
      <RelationshipRequestButton key={this.props.key} onRequestEnd={ this.props.onRequestEnd } relationship={ this.props.relationship } />
    </PersonsPopup_PersonItem>`

module.exports = PersonsPopup_RequestRelationship