###* @jsx React.DOM ###

window.RelationshipFollowerButton = React.createClass
  mixins: ['RelationshipMixin']

  propTypes:
    relationship: React.PropTypes.object.isRequired
    onRequestEnd: React.PropTypes.func

  getInitialState: ->
    isError:   false
    isProcess: false

  render: ->
    if @isPrivacy()
      unfollowButton = `<button className="button button--small button--outline-light-white button--icon"
                                onClick={ this.handleDisapproveClick }>
                          <i className="icon icon--cross" />
                        </button>`

    return `<div>
              <FollowButton relationship={ this.props.relationship } />
              { unfollowButton }
            </div>`

  isPrivacy: ->
    currentUser = CurrentUserStore.getUser()
    currentUser.is_privacy

  handleDisapproveClick: ->
    @unfollowFromYourself {
      success: => @props.onRequestEnd(@props.relationship)
    }