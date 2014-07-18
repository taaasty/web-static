###* @jsx React.DOM ###

window.PersonsPopup_GuessRelationship = PersonsPopup_GuessRelationship = React.createClass

  propTypes:
    relationship: React.PropTypes.object.isRequired

  render: ->
   `<PersonsPopup_PersonItem user={this.props.relationship.user}>
      <RelationshipFollowingButton relationship={ this.props.relationship } />
    </PersonsPopup_PersonItem>`

module.exports = PersonsPopup_GuessRelationship