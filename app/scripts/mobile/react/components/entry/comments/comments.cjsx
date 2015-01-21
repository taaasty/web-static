Fluxxor           = require 'fluxxor'
FluxMixin         = Fluxxor.FluxMixin(React)
StoreWatchMixin   = Fluxxor.StoreWatchMixin
CommentsMixin     = require './mixins/comments'
ComponentMixin    = require '../../../mixins/component'
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
  mixins: [StoreWatchMixin('CommentsStore'), CommentsMixin, ComponentMixin, FluxMixin]

  propTypes:
    flux:         PropTypes.object.isRequired
    entry:        PropTypes.object.isRequired
    commentsInfo: PropTypes.object
    user:         PropTypes.object
    limit:        PropTypes.number

  getDefaultProps: ->
    limit: LOAD_MORE_COMMENTS_LIMIT

  componentDidMount: ->
    if @props.commentsInfo?
      @getFlux().actions.initializeComments(
        @props.commentsInfo.comments
        @props.commentsInfo.total_count
      )

  getStateFromFlux: ->
    store = @getFlux().store 'CommentsStore'

    return {
      comments:   store.getComments()
      totalCount: store.getTotalCount()
    }

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
          flux={ @props.flux }
          comments={ @state.comments }
          entry={ @props.entry } />

  renderCommentForm: ->
    if @props.user?
      <CommentCreateForm
          entryId={ @props.entry.id }
          flux={ @props.flux } />

  isLoadingState: -> @state.currentState is LOADING_STATE

  activateShowState:    -> @safeUpdateState(currentState: SHOW_STATE)
  activateLoadingState: -> @safeUpdateState(currentState: LOADING_STATE)
  activateErrorState:   -> @safeUpdateState(currentState: ERROR_STATE)

module.exports = EntryComments