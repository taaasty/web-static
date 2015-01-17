EntryFeedMeta     = require './feed/meta'
# EntryComments     = require './comments/comments'
EntryContent      = require './content/content'
CurrentUserStore  = require '../../stores/currentUser'
ConnectStoreMixin = require '../../mixins/connectStore'
{ PropTypes } = React

TEXT_TYPE  = 'text'
IMAGE_TYPE = 'image'
VIDEO_TYPE = 'video'
QUOTE_TYPE = 'quote'

EntryFeed = React.createClass
  displayName: 'EntryFeed'
  mixins: [ConnectStoreMixin(CurrentUserStore)]

  propTypes:
    entry: PropTypes.object.isRequired

  render: ->
    <div className={ @getEntryClasses() }>
      <EntryContent entry={ @props.entry } />
      <EntryFeedMeta entry={ @props.entry } />
    </div>
    # <EntryComments
    #     entry={ @props.entry }
    #     commentsInfo={ @props.entry.comments_info }
    #     user={ @state.user } />

  getEntryClasses: ->
    # Small hack, depends on layout
    typeClass = switch @props.entry.type
      when TEXT_TYPE  then 'text'
      when IMAGE_TYPE then 'image'
      when VIDEO_TYPE then 'video'
      when QUOTE_TYPE then 'quote'
      else 'text'

    'post post--' + typeClass

  getStateFromStore: ->
    user: CurrentUserStore.getUser()

module.exports = EntryFeed