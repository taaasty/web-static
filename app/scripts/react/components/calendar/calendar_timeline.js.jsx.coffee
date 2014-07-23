###* @jsx React.DOM ###

TARGET_POST_CLASS='.post'

window.CalendarTimeline = CalendarTimeline = React.createClass

  propTypes:
    periods:      React.PropTypes.array.isRequired
    currentEntry: React.PropTypes.object

  componentDidMount: ->
    @$post = $ TARGET_POST_CLASS
    @$periodsList = $( @refs.periodsList.getDOMNode() )
    @attachScrollSpy @$post, @$periodsList

  componentWillUnmount: -> @dettachScrollSpy()

  render: ->
    that = @
    periodNodes = @props.periods.map (period, i) ->
      `<CalendarPeriod currentEntry={ that.props.currentEntry } period={ period } key={ i }></CalendarPeriod>`

    return `<div className="calendar__timeline-viewport calendar__timeline-viewport--active">
              <div className="calendar__timeline" ref="timeline">
                <ul className="calendar__periods nav" ref="periodsList">{ periodNodes }</ul>
              </div>
            </div>`

  attachScrollSpy: ($post, $periodList) ->
    $post.waypoint
      handler: (direction) ->
        activate = (target) ->
          selector = 'a[data-target="' + '#' + target + '"]'
          $periodList.find('.active').removeClass 'active'
          $(selector).parent().addClass 'active'

        # Обрабатываем только текущий пост, а не все, которые выше текщего scrollTop
        $el = $(@)
        $elOffsetTop = $el.offset().top
        $elOffsetTopHeight = $el.offset().top + $el.height()
        scrollTop = $(document).scrollTop()

        if $elOffsetTopHeight >= scrollTop >= $elOffsetTop
          # Активируется пост
          activate($el.data('id'))

        if direction is 'up' && $el.waypoint('prev').length > 0
          $prevEl = $( $el.waypoint('prev') )
          $prevElOffsetTop = $prevEl.offset().top
          $prevElOffsetTopAndHeight = $prevElOffsetTop + $el.height()

          if $prevElOffsetTopAndHeight >= scrollTop >= $prevElOffsetTop
            # Активируется предыдущий пост
            activate($prevEl.data('id'))

  dettachScrollSpy: -> @$post.waypoint 'destroy'

module.exports = CalendarTimeline
