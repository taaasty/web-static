###* @jsx React.DOM ###

window.PersonsPopup_FollowerRelationship = PersonsPopup_FollowerRelationship = React.createClass

  propTypes:
    relationship: React.PropTypes.object.isRequired

  render: ->
   `<PersonsPopup_PersonItem user={ this.props.relationship.reader }>
      <RelationshipFollowerButton relationship={ this.props.relationship.reverse_relationship } />
    </PersonsPopup_PersonItem>`

module.exports = PersonsPopup_FollowerRelationship