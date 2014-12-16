window.SmartFollowStatus = React.createClass

  propTypes:
    status: React.PropTypes.string.isRequired
    tlogId: React.PropTypes.number.isRequired

  getInitialState: ->
    status: @props.status

  componentDidMount: ->
    TastyEvents.on TastyEvents.keys.follow_status_changed(@props.tlogId), @updateFollowStatus

  componentWillUnmount: ->
    TastyEvents.off TastyEvents.keys.follow_status_changed(@props.tlogId), @updateFollowStatus

  render: -> <FollowStatus status={ this.state.status } />

  updateFollowStatus: (newStatus) -> @setState status: newStatus