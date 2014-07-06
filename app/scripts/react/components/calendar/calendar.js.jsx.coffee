###* @jsx React.DOM ###

window.Calendar = Calendar = React.createClass

  getInitialState: ->
    open:          false
    openedByHover: false
    openedByClick: false

  onMouseEnter: ->
    unless @state.open
      @setState open: true, openedByHover: true

  onMouseLeave: ->
    if @state.openedByHover
      @setState open: false, openedByHover: false

  onClick: ->
    if @state.openedByClick
      @setState open: false, openedByClick: false

    unless @state.open
      @setState open: true, openedByClick: true

  render: ->
    calendarClasses = React.addons.classSet calendar: true, 'calendar--open': @state.open
    
    return `<nav onClick={this.onClick}
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}
                 className={ calendarClasses }>
              <CalendarHeader day={ this.props.date.day }
                              info={ this.props.date.info }>
              </CalendarHeader>
              <CalendarTimeline periods={ this.props.periods }></CalendarTimeline>
            </nav>`

module.exports = Calendar