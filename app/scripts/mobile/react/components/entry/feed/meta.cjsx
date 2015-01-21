EntryMetaVoting   = require '../meta/voting'
EntryMetaActions  = require '../meta/actions'
EntryMetaComments = require '../meta/comments'
EntryMetaAuthor   = require '../meta/author'
{ PropTypes } = React

EntryFeedMeta = React.createClass
  displayName: 'EntryFeedMeta'

  propTypes:
    flux:  PropTypes.object.isRequired
    entry: PropTypes.object.isRequired

  render: ->
    <div className="post__meta">
      <EntryMetaActions entry={ @props.entry } />
      { @renderVoting() }
      <EntryMetaComments
          flux={ @props.flux }
          commentsCount={ @props.entry.comments_count } />
      <EntryMetaAuthor author={ @props.entry.author } />
    </div>

  renderVoting: ->
    if @props.entry.is_voteable
      <EntryMetaVoting
          rating={ @props.entry.rating }
          entryId={ @props.entry.id } />

module.exports = EntryFeedMeta