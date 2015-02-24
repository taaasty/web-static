{ PropTypes } = React

UserToolbarToggle = React.createClass
  displayName: 'UserToolbarToggle'

  propTypes:
    hasConversations: PropTypes.bool.isRequired
    hasNotifications: PropTypes.bool.isRequired
    onClick:          PropTypes.func.isRequired

  render: ->
    <div className="toolbar__toggle"
         onClick={ @handleClick }>
      { @renderIndicators() }
      <i className="icon icon--menu" />
    </div>

  renderIndicators: ->
    indicators = []

    if @props.hasConversations
      indicators.push <i className="toolbar__indicator toolbar__indicator--messages"
                         key="conversations" />

    if @props.hasNotifications
      indicators.push <i className="toolbar__indicator toolbar__indicator--notifications"
                         key="notifications" />

    return <span className="toolbar__indicators">
             { indicators }
           </span>

  handleClick: ->
    @props.onClick()

module.exports = UserToolbarToggle