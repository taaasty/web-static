EntryMetaVoting   = require './voting'
EntryMetaActions  = require './actions'
EntryMetaComments = require './comments'
{ PropTypes } = React

EntryMeta = React.createClass
  displayName: 'EntryMeta'

  propTypes:
    entry: PropTypes.object.isRequired

  render: ->
    <div className="post__meta">
      <EntryMetaActions entry={ @props.entry } />
      { @renderVoting() }
      <EntryMetaComments
          entryId={ @props.entry.id }
          commentsCount={ @props.entry.comments_count } />
    </div>

  renderVoting: ->
    if @props.entry.is_voteable
      <EntryMetaVoting
          rating={ @props.entry.rating }
          entryId={ @props.entry.id } />

module.exports = EntryMeta