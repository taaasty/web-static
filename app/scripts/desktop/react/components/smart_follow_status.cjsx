window.SmartFollowStatus = React.createClass
  mixins: ['RelationshipMixin']

  propTypes:
    status: React.PropTypes.string.isRequired
    tlogId: React.PropTypes.number.isRequired

  getInitialState: ->
    relationship:
      user_id: @props.tlogId
    status: @props.status
    isError:      false
    isProcess:    false

  componentDidMount: ->
    TastyEvents.on TastyEvents.keys.follow_status_changed(@props.tlogId), @updateFollowStatus

  componentWillUnmount: ->
    TastyEvents.off TastyEvents.keys.follow_status_changed(@props.tlogId), @updateFollowStatus

  render: -> <FollowStatus status={ this.state.status }
                           error={ this.state.isError }
                           process={ this.state.isProcess }
                           onClick={ this.handleClick }/>

  handleClick: ->
    if @state.status is 'none' && !@state.isError && !@state.isProcess
      @follow()

  updateFollowStatus: (newStatus) ->
    @setState status: newStatus