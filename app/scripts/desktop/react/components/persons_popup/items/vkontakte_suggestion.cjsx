{ PropTypes } = React

VkontakteSuggestionsItem = React.createClass

  propTypes:
    suggestion: PropTypes.object.isRequired

  render: ->
    <PersonsPopup_PersonItem user={ this.props.suggestion.user }>
      <FollowButton relationship={ this.props.suggestion } />
    </PersonsPopup_PersonItem>

module.exports = VkontakteSuggestionsItem