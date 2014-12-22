TextEntryHeader  = require './header'
TextEntryContent = require './content'
EntryMeta        = require '../meta/meta'
EntryComments    = require '../comments/comments'
{ PropTypes } = React

TextEntry = React.createClass
  displayName: 'TextEntry'

  propTypes:
    entry: PropTypes.object.isRequired
    user:  PropTypes.object

  render: ->
    <div className="post post--text">
      <TextEntryHeader title={ @props.entry.title } />
      <TextEntryContent text={ @props.entry.text } />
      <EntryMeta entry={ @props.entry } />
      <EntryComments
          entryUrl={ @props.entry.entry_url }
          commentsInfo={ @props.entry.comments_info }
          user={ @props.user } />
    </div>

module.exports = TextEntry