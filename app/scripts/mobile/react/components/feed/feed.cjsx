FeedEmptyPageMessage = require './emptyPageMessage'
EntryFeed            = require '../entry/feed'
{ PropTypes } = React

Feed = React.createClass

  propTypes:
    entries: PropTypes.array.isRequired

  render: ->
    <div className="posts">
      { @renderEntryList() }
    </div>

  renderEntryList: ->
    if @props.entries.length
      @props.entries.map (entry) ->
        <EntryFeed entry={ entry } key={ entry.id } />
    else
      <FeedEmptyPageMessage />

module.exports = Feed