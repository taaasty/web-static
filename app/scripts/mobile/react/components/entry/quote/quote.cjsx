QuoteEntryContent = require './content'
EntryMeta         = require '../meta/meta'
EntryComments     = require '../comments/comments'
{ PropTypes } = React

QuoteEntry = React.createClass
  displayName: 'QuoteEntry'

  propTypes:
    entry: PropTypes.object.isRequired
    user:  PropTypes.object

  render: ->
    <div className="post post--quote">
      <QuoteEntryContent
          text={ @props.entry.text }
          source={ @props.entry.source } />
      <EntryMeta entry={ @props.entry } />
      <EntryComments
          entry={ @props.entry }
          commentsInfo={ @props.entry.comments_info }
          user={ @props.user } />
    </div>

module.exports = QuoteEntry