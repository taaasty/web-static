###* @jsx React.DOM ###

window.EntryMetabarDate = React.createClass

  propTypes:
    time: React.PropTypes.string.isRequired

  render: ->
    now = moment()
    createdAt = moment(@props.time)

    if now.diff(createdAt, 'days') <= 1
      date = createdAt.calendar()
    else
      if now.year() != createdAt.year()
        date = createdAt.format 'D MMMM YYYY'
      else
        date = createdAt.format 'D MMMM'

    return `<span className="meta-item meta-item--date">
              <span className="meta-item__content">
                <span className="meta-item__common">{ date }</span>
              </span>
            </span>`