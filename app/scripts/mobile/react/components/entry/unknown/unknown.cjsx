UnknownEntryHeader  = require './header'
UnknownEntryContent = require './content'
EntryMeta           = require '../meta/meta'
EntryComments       = require '../comments/comments'
{ PropTypes } = React

UnknownEntry = React.createClass
  displayName: 'UnknownEntry'

  propTypes:
    entry: PropTypes.object.isRequired
    user:  PropTypes.object

  render: ->
    <div className="post post--text">
      <UnknownEntryHeader title={ @props.entry.title } />
      <UnknownEntryContent />
      <EntryMeta entry={ @props.entry } />
      <EntryComments
          entry={ @props.entry }
          commentsInfo={ @props.entry.comments_info }
          user={ @props.user } />
    </div>

module.exports = UnknownEntry