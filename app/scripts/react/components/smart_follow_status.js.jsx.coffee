###* @jsx React.DOM ###

window.SmartFollowStatus = React.createClass

  propTypes:
    status: React.PropTypes.string.isRequired
    tlogId: React.PropTypes.number.isRequired

  getInitialState: ->
    status: @props.status

  componentDidMount: ->
    TastyEvents.on "follow_status:#{ @props.tlogId }:changed", @updateFollowStatus

  componentWillUnmount: ->
    TastyEvents.off "follow_status:#{ @props.tlogId }:changed", @updateFollowStatus

  render: -> `<FollowStatus status={ this.state.status } />`

  updateFollowStatus: (newStatus) -> @setState status: newStatus