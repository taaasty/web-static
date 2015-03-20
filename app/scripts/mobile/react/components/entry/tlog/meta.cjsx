EntryMetaVoting = require '../meta/voting'
EntryMetaActions = require '../meta/actions'
EntryMetaComments = require '../meta/comments'
EntryMetaDate = require '../meta/date'
{ PropTypes } = React

EntryTlogMeta = React.createClass
  displayName: 'EntryTlogMeta'

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
      <EntryMetaDate
          date={ @props.entry.created_at }
          entryUrl={ @props.entry.entry_url } />
    </div>

  renderVoting: ->
    if @props.entry.is_voteable
      <EntryMetaVoting
          rating={ @props.entry.rating }
          entryId={ @props.entry.id } />

module.exports = EntryTlogMeta