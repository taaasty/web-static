EntryMeta     = require './meta/meta'
EntryComments = require './comments/comments'
EntryContent  = require './content/content'
CurrentUserStore  = require '../../stores/currentUser'
ConnectStoreMixin = require '../../mixins/connectStore'
{ PropTypes } = React

TEXT_TYPE  = 'text'
IMAGE_TYPE = 'image'
VIDEO_TYPE = 'video'
QUOTE_TYPE = 'quote'

Entry = React.createClass
  displayName: 'Entry'
  mixins: [ConnectStoreMixin(CurrentUserStore)]

  propTypes:
    entry: PropTypes.object.isRequired

  render: ->
    <div className={ @getEntryClasses() }>
      <EntryContent entry={ @props.entry } />
      <EntryMeta entry={ @props.entry } />
      <EntryComments
          entry={ @props.entry }
          commentsInfo={ @props.entry.comments_info }
          user={ @state.user } />
    </div>

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

module.exports = Entry