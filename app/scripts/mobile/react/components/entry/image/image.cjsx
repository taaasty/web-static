ImageEntryContent = require './content'
EntryMeta         = require '../meta/meta'
EntryComments     = require '../comments/comments'
{ PropTypes } = React

module.exports = React.createClass
  displayName: 'ImageEntry'

  propTypes:
    entry: PropTypes.object.isRequired
    user:  PropTypes.object

  render: ->
    <div className="post post--image">
      <ImageEntryContent
          title={ @props.entry.title }
          imageAttachments={ @props.entry.image_attachments } />
      <EntryMeta entry={ @props.entry } />
      <EntryComments
          entryUrl={ @props.entry.entry_url }
          commentsInfo={ @props.entry.comments_info }
          user={ @props.user } />
    </div>