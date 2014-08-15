###* @jsx React.DOM ###

window.PersonsPopup_FollowerRelationship = React.createClass

  propTypes:
    relationship: React.PropTypes.object.isRequired

  shouldComponentUpdate: (nextProps) ->
    true if @props.relationship.state != nextProps.relationship.state
    false

  render: ->
   `<PersonsPopup_PersonItem user={ this.props.relationship.reader }>
      <FollowButton relationship={ this.props.relationship.reverse_relationship } />
    </PersonsPopup_PersonItem>`