VideoEntryContent = require './content'
EntryMeta         = require '../meta/meta'
EntryComments     = require '../comments/comments'
{ PropTypes } = React

VideoEntry = React.createClass
  displayName: 'VideoEntry'

  propTypes:
    entry: PropTypes.object.isRequired
    user:  PropTypes.object

  render: ->
    <div className="post post--video">
      <VideoEntryContent iframely={ @props.entry.iframely } />
      <EntryMeta entry={ @props.entry } />
      <EntryComments
          entryUrl={ @props.entry.entry_url }
          commentsInfo={ @props.entry.comments_info }
          user={ @props.user } />
    </div>

module.exports = VideoEntry