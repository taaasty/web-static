###* @jsx React.DOM ###

window.PersonsPopup_FollowingRelationship = React.createClass

  propTypes:
    relationship: React.PropTypes.object.isRequired

  shouldComponentUpdate: (nextProps) ->
    true if @props.relationship.state != nextProps.relationship.state
    false

  render: ->
   `<PersonsPopup_PersonItem user={ this.props.relationship.user }>
      <FollowButton relationship={ this.props.relationship } />
    </PersonsPopup_PersonItem>`