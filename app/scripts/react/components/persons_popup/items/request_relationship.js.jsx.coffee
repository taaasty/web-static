###* @jsx React.DOM ###

window.PersonsPopup_RequestRelationship = PersonsPopup_RequestRelationship = React.createClass

  propTypes:
    relationship: React.PropTypes.object.isRequired

  render: ->
   `<PersonsPopup_PersonItem user={ this.props.relationship.reader }>
      <RelationshipRequestButton relationship={ this.props.relationship }
                                 onRequestEnd={ this.props.onRequestEnd }
                                 key={ this.props.key } />
    </PersonsPopup_PersonItem>`

module.exports = PersonsPopup_RequestRelationship