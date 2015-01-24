EntryTlogMeta     = require './tlog/meta'
EntryComments     = require './comments/comments'
EntryContent      = require './content/content'
CurrentUserStore  = require '../../stores/currentUser'
ConnectStoreMixin = require '../../../../shared/react/mixins/connectStore'
ComponentMixin    = require '../../mixins/component'
EntryMixin        = require './mixins/entry'
{ PropTypes } = React

EntryTlog = React.createClass
  displayName: 'EntryTlog'
  mixins: [ConnectStoreMixin(CurrentUserStore), EntryMixin, ComponentMixin]

  propTypes:
    entry:       PropTypes.object.isRequired
    loadPerTime: PropTypes.number

  render: ->
    <div className={ @getEntryClasses() }>
      <EntryContent entry={ @props.entry } />
      <EntryTlogMeta
          entry={ @props.entry }
          commentsCount={ @state.commentsCount } />
      <EntryComments
          user={ @state.user }
          entry={ @props.entry }
          comments={ @state.comments }
          commentsCount={ @state.commentsCount }
          loading={ @isLoadingState() }
          loadPerTime={ @props.loadPerTime }
          onCommentsLoadMore={ @loadMoreComments }
          onCommentCreate={ @createComment }
          onCommentEdit={ @editComment }
          onCommentDelete={ @deleteComment }
          onCommentReport={ @reportComment } />
    </div>

  getStateFromStore: ->
    user: CurrentUserStore.getUser()

module.exports = EntryTlog