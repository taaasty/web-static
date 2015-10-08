CLASS_PREFIX_STATE = 'state--'

STATE_NONE      = 'none'
STATE_FRIEND    = 'friend'
STATE_IGNORED   = 'ignored'
STATE_GUESSED   = 'guessed'
STATE_REQUESTED = 'requested'
STATE_ERROR     = 'error'
STATE_PROCESS   = 'process'

window.FollowStatus = React.createClass
  propTypes:
    status:  React.PropTypes.string.isRequired
    error:   React.PropTypes.bool
    process: React.PropTypes.bool
    onClick: React.PropTypes.func

  componentDidMount: ->
    $followStatus = $( @getDOMNode() )
    $followStatus.tooltip
      placement: 'bottom'
      trigger:   'click hover'

  componentWillUnmount: ->
    $followStatus = $( @getDOMNode() )
    $followStatus.tooltip 'destroy'

  render: ->
    tooltipText = switch @props.status
      when STATE_NONE      then i18n.t 'follow_status_none'
      when STATE_FRIEND    then i18n.t 'follow_status_friend'
      when STATE_IGNORED   then i18n.t 'follow_status_ignored'
      when STATE_GUESSED   then i18n.t 'follow_status_guessed'
      when STATE_REQUESTED then i18n.t 'follow_status_requested'
      else console.warn 'Неизвестный статус', @props.status

    content = <i className='icon'></i>
    content = <Spinner size={ 14 } /> if @props.process

    stateClass = @props.status
    stateClass = STATE_ERROR   if @props.error
    stateClass = STATE_PROCESS if @props.process
    stateClass = CLASS_PREFIX_STATE + stateClass

    <span data-original-title={ tooltipText }
          className={ 'follow-status ' + stateClass }
          onClick={ this.props.onClick }>
      { content }
    </span>