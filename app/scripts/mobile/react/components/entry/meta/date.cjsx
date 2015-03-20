{ PropTypes } = React

EntryMetaDate = React.createClass
  displayName: 'EntryMetaDate'

  propTypes:
    date: PropTypes.string.isRequired
    entryUrl: PropTypes.string.isRequired

  render: ->
    <a href={ @props.entryUrl }
       className="meta-date">
      { @getFormattedDate() }
    </a>

  getFormattedDate: ->
    now = moment()
    entryDate = moment @props.date

    if now.diff(entryDate, 'days') < 1
      date = entryDate.calendar()
    else
      if now.year() != entryDate.year()
        date = entryDate.format 'D MMMM YYYY'
      else
        date = entryDate.format 'D MMMM'

    date

module.exports = EntryMetaDate