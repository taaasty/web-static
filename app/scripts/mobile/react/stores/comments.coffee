assign    = require 'react/lib/Object.assign'
Fluxxor   = require 'fluxxor'
Constants = require '../constants/constants'

CommentsStore = Fluxxor.createStore

  getComments:   (entryId) -> @_comments
  getTotalCount: (entryId) -> @_totalCount

  initialize: ->
    @_comments   = []
    @_totalCount = 0

    @bindActions(
      Constants.entry.INITIALIZE_COMMENTS, @onInitializeComments
      Constants.entry.LOAD_COMMENTS,       @onLoadComments
      Constants.entry.CREATE_COMMENT,      @onCreateComment
      Constants.entry.EDIT_COMMENT,        @onEditComment
      Constants.entry.DELETE_COMMENT,      @onDeleteComment
    )

  initializeComments: (comments, totalCount) ->
    @_comments   = comments
    @_totalCount = totalCount

  updateTotalCount: (totalCount) ->
    @_totalCount = totalCount

  unshiftComments: (comments) ->
    @_comments = comments.concat @_comments

  pushComment: (comment) ->
    newComments = @_comments[..]
    newComments.push comment

    @_comments = newComments

  updateComment: (comment) ->
    for _comment in @_comments when _comment.id == comment.id
      assign _comment, comment
      break

  deleteComment: (commentId) ->
    newComments = @_comments[..]

    for newComment, i in newComments when newComment.id == commentId
      newComments.splice i, 1
      break

    @_comments = newComments

  onInitializeComments: ({comments, totalCount}) ->
    @initializeComments comments, totalCount
    @emit 'change'

  onLoadComments: ({comments, totalCount}) ->
    @unshiftComments comments
    @updateTotalCount totalCount
    @emit 'change'

  onCreateComment: ({comment}) ->
    @pushComment comment
    @updateTotalCount @_totalCount + 1
    @emit 'change'

  onEditComment: ({comment}) ->
    @updateComment comment
    @emit 'change'

  onDeleteComment: ({commentId}) ->
    @deleteComment commentId
    @updateTotalCount @_totalCount - 1
    @emit 'change'

module.exports = CommentsStore