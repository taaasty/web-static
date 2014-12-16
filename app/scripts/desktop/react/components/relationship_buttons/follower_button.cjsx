window.RelationshipFollowerButton = React.createClass
  mixins: ['RelationshipMixin']

  propTypes:
    relationship: React.PropTypes.object.isRequired

  getInitialState: ->
    @getStateFromStore()

  componentDidMount: ->
    CurrentUserStore.addChangeListener @onStoreChange

  componentWillUnmount: ->
    CurrentUserStore.removeChangeListener @onStoreChange

  render: ->
    if @isProfilePrivate()
      unfollowButton = <button
                           className="button button--small button--outline-light-white button--icon"
                           onClick={ this.handleDisapproveClick }>
                         <i className="icon icon--cross" />
                       </button>

    return <div>
             <FollowButton relationship={ this.props.relationship.reverse_relationship } />
             { unfollowButton }
           </div>

  isProfilePrivate: -> @state.user.is_privacy is true

  getStateFromStore: ->
    user: CurrentUserStore.getUser()

  handleDisapproveClick: ->
    @unfollowFromYourself
      success: =>
        RelationshipsDispatcher.handleServerAction {
          type: 'relationshipUnfollowedFromYourself'
          relationship: @props.relationship
        }

  onStoreChange: ->
    @setState @getStateFromStore()