assign           = require 'react/lib/Object.assign'
EntryViewActions = require '../../../actions/view/entry'

LOAD_MORE_COMMENTS_LIMIT = 30
TEXT_TYPE  = 'text'
IMAGE_TYPE = 'image'
VIDEO_TYPE = 'video'
QUOTE_TYPE = 'quote'

EntryMixin =

  getDefaultProps: ->
    loadPerTime: LOAD_MORE_COMMENTS_LIMIT

  getInitialState: ->
    comments:      @props.entry.comments_info?.comments    || []
    commentsCount: @props.entry.comments_info?.total_count || 0
    loading:       false

  isLoadingState: -> @state.loading is true

  activateLoadingState:   -> @safeUpdateState(loading: true)
  deactivateLoadingState: -> @safeUpdateState(loading: false)

  loadMoreComments: ->
    entryId     = @props.entry.id
    toCommentId = @state.comments[0].id
    limit       = @props.loadPerTime

    @activateLoadingState()

    EntryViewActions.loadComments entryId, toCommentId, limit
      .then (commentsInfo) =>
        comments      = commentsInfo.comments
        commentsCount = commentsInfo.total_count

        @safeUpdateState
          comments:      comments.concat @state.comments
          commentsCount: commentsCount
      .always @deactivateLoadingState

  createComment: (text) ->
    entryId = @props.entry.id

    EntryViewActions.createComment entryId, text
      .then (comment) =>
        @state.comments.push comment
        @safeUpdateState
          comments:      @state.comments
          commentsCount: @state.commentsCount + 1
      .always @deactivateLoadingState

  editComment: (commentId, text) ->
    entryId = @props.entry.id

    EntryViewActions.editComment entryId, commentId, text
      .then (comment) =>
        for item in @state.comments when item.id == comment.id
          assign item, comment
          break
        @forceUpdate()

  deleteComment: (commentId) ->
    entryId = @props.entry.id

    EntryViewActions.deleteComment entryId, commentId
      .then =>
        for item, i in @state.comments when item.id == commentId
          @state.comments.splice i, 1
          break
        @forceUpdate()

  reportComment: (commentId) ->
    EntryViewActions.reportComment commentId

  getEntryClasses: ->
    # Small hack, depends on layout
    typeClass = switch @props.entry.type
      when TEXT_TYPE  then 'text'
      when IMAGE_TYPE then 'image'
      when VIDEO_TYPE then 'video'
      when QUOTE_TYPE then 'quote'
      else 'text'

    'post post--' + typeClass

module.exports = EntryMixin