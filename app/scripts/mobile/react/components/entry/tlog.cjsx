Fluxxor           = require 'fluxxor'
CommentsStore     = require '../../stores/comments'
CommentsActions   = require '../../actions/comments'
EntryTlogMeta     = require './tlog/meta'
EntryComments     = require './comments/comments'
EntryContent      = require './content/content'
CurrentUserStore  = require '../../stores/currentUser'
ConnectStoreMixin = require '../../../../shared/react/mixins/connectStore'
{ PropTypes } = React

TEXT_TYPE  = 'text'
IMAGE_TYPE = 'image'
VIDEO_TYPE = 'video'
QUOTE_TYPE = 'quote'

EntryTlog = React.createClass
  displayName: 'EntryTlog'
  mixins: [ConnectStoreMixin(CurrentUserStore)]

  propTypes:
    entry: PropTypes.object.isRequired

  componentWillMount: ->
    actions = CommentsActions
    stores  = CommentsStore: new CommentsStore()

    @flux = new Fluxxor.Flux stores, actions

  componentWillUnmount: ->
    @flux = null

  render: ->
    <div className={ @getEntryClasses() }>
      <EntryContent entry={ @props.entry } />
      <EntryTlogMeta
          flux={ @flux }
          entry={ @props.entry } />
      <EntryComments
          flux={ @flux }
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

module.exports = EntryTlog