ImageEntryContent = require './content'
EntryMeta         = require '../meta/meta'
EntryComments     = require '../comments/comments'
{ PropTypes } = React

ImageEntry = React.createClass
  displayName: 'ImageEntry'

  propTypes:
    entry: PropTypes.object.isRequired
    user:  PropTypes.object

  render: ->
    <div className="post post--image">
      <ImageEntryContent
          title={ @props.entry.title }
          imageUrl={ @props.entry.image_url }
          imageAttachments={ @props.entry.image_attachments } />
      <EntryMeta entry={ @props.entry } />
      <EntryComments
          entry={ @props.entry }
          commentsInfo={ @props.entry.comments_info }
          user={ @props.user } />
    </div>

module.exports = ImageEntry