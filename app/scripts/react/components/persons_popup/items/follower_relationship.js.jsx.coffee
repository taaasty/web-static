###* @jsx React.DOM ###

window.PersonsPopup_FollowerRelationship = PersonsPopup_FollowerRelationship = React.createClass

  propTypes:
    relationship: React.PropTypes.object.isRequired

  render: ->
   `<PersonsPopup_PersonItem user={ this.props.relationship.reader }>
      <FollowButton tlogId={ this.props.relationship.reader.id } />
    </PersonsPopup_PersonItem>`

module.exports = PersonsPopup_FollowerRelationship
