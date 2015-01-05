EntryViewActions  = require '../../../actions/view/entry'
CommentsStore     = require '../../../stores/comments'
CommentsMixin     = require './mixins/comments'
ComponentMixin    = require '../../../mixins/component'
ConnectStoreMixin = require '../../../mixins/connectStore'
CommentList       = require './commentList'
CommentCreateForm = require './commentForm/create'
CommentsLoadMore  = require './loadMore'
{ PropTypes } = React

LOAD_MORE_COMMENTS_LIMIT = 50
SHOW_STATE    = 'show'
LOADING_STATE = 'load'
ERROR_STATE   = 'error'

EntryComments = React.createClass
  displayName: 'EntryComments'
  mixins: [ConnectStoreMixin(CommentsStore), CommentsMixin, ComponentMixin]

  propTypes:
    entry:        PropTypes.object.isRequired
    commentsInfo: PropTypes.object.isRequired
    user:         PropTypes.object
    limit:        PropTypes.number

  getDefaultProps: ->
    limit: LOAD_MORE_COMMENTS_LIMIT

  getInitialState: ->
    currentState: SHOW_STATE

  componentWillMount: ->
    EntryViewActions.initializeComments(
      @props.entry.id
      @props.commentsInfo.comments
      @props.commentsInfo.total_count
    )

  render: ->
    <div className="post__comments">
      <div className="comments">
        { @renderLoadMore() }
        { @renderCommentList() }
        { @renderCommentForm() }
      </div>
    </div>

  renderLoadMore: ->
    if @state.totalCount > @state.comments.length
      <CommentsLoadMore
          totalCount={ @state.totalCount }
          loadedCount={ @state.comments.length }
          limit={ @props.limit }
          loading={ @isLoadingState() }
          onClick={ @loadMoreComments } />

  renderCommentList: ->
    if @state.comments.length
      <CommentList
          comments={ @state.comments }
          entry={ @props.entry } />

  renderCommentForm: ->
    if @props.user?
      <CommentCreateForm entryId={ @props.entry.id } />

  isLoadingState: -> @state.currentState is LOADING_STATE

  activateShowState:    -> @safeUpdateState(currentState: SHOW_STATE)
  activateLoadingState: -> @safeUpdateState(currentState: LOADING_STATE)
  activateErrorState:   -> @safeUpdateState(currentState: ERROR_STATE)

  getStateFromStore: ->
    entryId = @props.entry.id

    comments:   CommentsStore.getComments(entryId)   || @props.commentsInfo.comments
    totalCount: CommentsStore.getTotalCount(entryId) || @props.commentsInfo.total_count

module.exports = EntryComments