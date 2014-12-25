EntryMetaActions = require './actions'
{ PropTypes } = React

module.exports = React.createClass
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
    #TODO: Voting component
    if @props.entry.is_voteable
      <div className="meta-voting">
        { @props.entry.rating.votes }
      </div>