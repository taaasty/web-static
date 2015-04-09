FeedEmptyPageMessage = require './emptyPageMessage'
FeedLoadMore         = require './loadMore'
EntryFeed            = require '../entry/Feed'
{ PropTypes } = React

Feed = React.createClass
  displayName: 'Feed'

  propTypes:
    entries:          PropTypes.array.isRequired
    loading:          PropTypes.bool.isRequired
    everythingLoaded: PropTypes.bool.isRequired
    onLoadMore:       PropTypes.func.isRequired

  render: ->
    <div className="posts">
      { @renderEntryList() }
      { @renderLoadMore() }
    </div>

  renderEntryList: ->
    if @props.entries.length
      @props.entries.map (entry) ->
        <EntryFeed entry={ entry } key={ entry.id } />
    else
      <FeedEmptyPageMessage />

  renderLoadMore: ->
    if @props.entries.length && !@props.everythingLoaded
      <FeedLoadMore
          loading={ @props.loading }
          onClick={ @props.onLoadMore } />

module.exports = Feed