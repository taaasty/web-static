{ PropTypes } = React

FacebookSuggestionsItem = React.createClass

  propTypes:
    suggestion: PropTypes.object.isRequired

  render: ->
    <PersonsPopup_PersonItem user={ @props.suggestion.user }>
      <FollowButton relationship={ @props.suggestion } />
    </PersonsPopup_PersonItem>

module.exports = FacebookSuggestionsItem