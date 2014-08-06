###* @jsx React.DOM ###

window.PersonsPopup_GuessRelationship = React.createClass

  propTypes:
    relationship: React.PropTypes.object.isRequired

  render: ->
   `<PersonsPopup_PersonItem user={ this.props.relationship.user }>
      <RelationshipGuessButton relationship={ this.props.relationship }
                               onRequestEnd={ this.props.onRequestEnd }
                               key={ this.props.key } />
    </PersonsPopup_PersonItem>`