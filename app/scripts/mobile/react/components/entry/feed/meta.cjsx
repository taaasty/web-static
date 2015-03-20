EntryMetaVoting   = require '../meta/voting'
EntryMetaActions  = require '../meta/actions'
EntryMetaComments = require '../meta/comments'
EntryMetaAuthor   = require '../meta/author'
{ PropTypes } = React

EntryFeedMeta = React.createClass
  displayName: 'EntryFeedMeta'

  propTypes:
    entry: PropTypes.object.isRequired
    commentsCount: PropTypes.number.isRequired
    onMetaCommentsClick: PropTypes.func.isRequired

  render: ->
    <div className="post__meta">
      <EntryMetaActions entry={ @props.entry } />
      { @renderVoting() }
      <EntryMetaComments
          commentsCount={ @props.commentsCount }
          onClick={ @props.onMetaCommentsClick } />
      <EntryMetaAuthor author={ @props.entry.author } />
    </div>

  renderVoting: ->
    if @props.entry.is_voteable
      <EntryMetaVoting
          rating={ @props.entry.rating }
          entryId={ @props.entry.id } />

module.exports = EntryFeedMeta