EntryMetaVoting  = require './voting'
EntryMetaActions = require './actions'
{ PropTypes } = React

EntryMeta = React.createClass
  displayName: 'EntryMeta'

  propTypes:
    entry: PropTypes.object.isRequired

  render: ->
    <div className="post__meta">
      { @renderVoting() }
      <div className="meta-comments">{ @props.entry.comments_count }</div>
      <EntryMetaActions entry={ @props.entry } />
    </div>

  renderVoting: ->
    if @props.entry.is_voteable
      <EntryMetaVoting
          rating={ @props.entry.rating }
          entryId={ @props.entry.id } />

module.exports = EntryMeta