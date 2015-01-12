CLASS_PREFIX_STATE = 'state--'

STATE_ERROR   = 'error'
STATE_PROCESS = 'process'

#TODO: i18n
TOOLTIP_TEXT_NONE      = 'Подписаться на тлог'
TOOLTIP_TEXT_FRIEND    = 'Вы подписаны на данный тлог'
TOOLTIP_TEXT_IGNORED   = 'Вам отказано в подписке на данный тлог'
TOOLTIP_TEXT_REQUESTED = 'В ожидании'
TOOLTIP_TEXT_PROCESS   = 'Отправка запроса'
TOOLTIP_TEXT_ERROR     = 'Ошибка'

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
      when 'none'      then TOOLTIP_TEXT_NONE
      when 'friend'    then TOOLTIP_TEXT_FRIEND
      when 'ignored'   then TOOLTIP_TEXT_IGNORED
      when 'requested' then TOOLTIP_TEXT_REQUESTED
      else console.warn 'Неизвестный статус', @props.status

    content = <i className='icon'></i>
    content = <Spinner size={ 15 } /> if @props.process

    stateClass = @props.status
    stateClass = STATE_ERROR   if @props.error
    stateClass = STATE_PROCESS if @props.process
    stateClass = CLASS_PREFIX_STATE + stateClass

    <span data-original-title={ tooltipText }
          className={ 'follow-status ' + stateClass }
          onClick={ this.props.onClick }>
      { content }
    </span>