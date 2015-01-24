EntryMetaVoting   = require '../meta/voting'
EntryMetaActions  = require '../meta/actions'
EntryMetaComments = require '../meta/comments'
{ PropTypes } = React

EntryTlogMeta = React.createClass
  displayName: 'EntryTlogMeta'

  propTypes:
    entry:         PropTypes.object.isRequired
    commentsCount: PropTypes.number.isRequired

  render: ->
    <div className="post__meta">
      <EntryMetaActions entry={ @props.entry } />
      { @renderVoting() }
      <EntryMetaComments commentsCount={ @props.commentsCount } />
    </div>

  renderVoting: ->
    if @props.entry.is_voteable
      <EntryMetaVoting
          rating={ @props.entry.rating }
          entryId={ @props.entry.id } />

module.exports = EntryTlogMeta