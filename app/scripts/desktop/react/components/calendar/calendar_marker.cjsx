classnames = require 'classnames'

window.CalendarMarker = React.createClass
  mixins: [ReactGrammarMixin]

  propTypes:
    marker:      React.PropTypes.object.isRequired
    selected:    React.PropTypes.bool.isRequired
    highlighted: React.PropTypes.bool.isRequired

  shouldComponentUpdate: (nextProps) ->
    nextProps.selected != @props.selected ||
    nextProps.marker.entry_id != @props.marker.entry_id

  render: ->
    records = @getNumberOfRecords @props.marker.comments_count
    date = moment @props.marker.created_at
    createdAt = date.format 'D MMMM'
    leftIndent = @getPercentValueOfDay date.dayOfYear()

    markerClasses = classnames('calendar__period-marker', {
      'calendar__period-marker--current': @props.selected
      'calendar__period-marker--highlighted': @props.highlighted
    })

    return <li>
             <a href={ this.props.marker.entry_url }
                data-target={ "#" + this.props.marker.entry_id }
                data-marker-date={ createdAt }
                data-marker-rows={ records }
                className={ markerClasses }
                style={{ left: leftIndent }} />
           </li>

  getPercentValueOfDay: (day) ->
    (day * parseInt(100, 10) / parseInt(365, 10)).toFixed(2) + '%'

  getNumberOfRecords: (number) ->
    if number > 0
      i18n.t 'marker_comments_count', count: number
    else
      i18n.t 'marker_no_comments'