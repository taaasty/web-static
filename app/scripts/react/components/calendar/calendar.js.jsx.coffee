###* @jsx React.DOM ###

window.Calendar = Calendar = React.createClass

  getInitialState: ->
    open: 'closed'

  onMouseEnter: ->
    if @state.open == 'closed'
      @setState(open: 'openedByHover')

  onMouseLeave: ->
    if @state.open == 'openedByHover'
      @setState(open: 'closed')

  onClick: ->
    switch @state.open
      when 'closed' then @setState(open: 'openedByClick')
      when 'openedByClick' then @setState(open: 'closed')
      when 'openedByHover' then @setState(open: 'closed')

  render: ->
    calendarClasses = React.addons.classSet calendar: true, 'calendar--open': @state.open != 'closed'

    return `<nav onClick={this.onClick}
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}
                 className={ calendarClasses }>
              <CalendarHeader date={ this.props.date }></CalendarHeader>
              <CalendarTimeline periods={ this.props.periods }></CalendarTimeline>
            </nav>`

module.exports = Calendar