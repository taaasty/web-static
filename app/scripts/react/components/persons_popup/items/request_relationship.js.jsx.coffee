###* @jsx React.DOM ###

window.PersonsPopup_RequestRelationship = React.createClass

  propTypes:
    relationship: React.PropTypes.object.isRequired

  shouldComponentUpdate: (nextProps) ->
    true if @props.relationship.state != nextProps.relationship.state
    false

  render: ->
   `<PersonsPopup_PersonItem user={ this.props.relationship.reader }>
      <RelationshipRequestButton relationship={ this.props.relationship }
                                 onRequestEnd={ this.props.onRequestEnd }
                                 key={ this.props.key } />
    </PersonsPopup_PersonItem>`