EntryFeedMeta     = require './feed/meta'
EntryComments     = require './comments/comments'
EntryContent      = require './content/content'
CurrentUserStore  = require '../../stores/currentUser'
ConnectStoreMixin = require '../../../../shared/react/mixins/connectStore'
ComponentMixin    = require '../../mixins/component'
EntryMixin        = require './mixins/entry'
{ PropTypes } = React

EntryFeed = React.createClass
  displayName: 'EntryFeed'
  mixins: [ConnectStoreMixin(CurrentUserStore), EntryMixin, ComponentMixin]

  propTypes:
    entry:       PropTypes.object.isRequired
    loadPerTime: PropTypes.number
    commentFormVisible: PropTypes.bool

  getDefaultProps: ->
    commentFormVisible: false

  getInitialState: ->
    commentFormVisible: @props.commentFormVisible

  render: ->
    <div className={ @getEntryClasses() }>
      <EntryContent entry={ @props.entry } />
      <EntryFeedMeta
          entry={ @props.entry }
          commentsCount={ @state.commentsCount }
          onMetaCommentsClick={ @toggleCommentForm } />
      <EntryComments
          user={ @state.user }
          entry={ @props.entry }
          comments={ @state.comments }
          commentsCount={ @state.commentsCount }
          loading={ @isLoadingState() }
          loadPerTime={ @props.loadPerTime }
          formVisible={ @state.commentFormVisible }
          onCommentsLoadMore={ @loadMoreComments }
          onCommentCreate={ @createComment }
          onCommentEdit={ @editComment }
          onCommentDelete={ @deleteComment }
          onCommentReport={ @reportComment } />
    </div>

  toggleCommentForm: ->
    @setState(commentFormVisible: !@state.commentFormVisible)

  getStateFromStore: ->
    user: CurrentUserStore.getUser()

module.exports = EntryFeed