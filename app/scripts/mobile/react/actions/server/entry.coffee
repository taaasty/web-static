Constants     = require '../../constants/constants'
AppDispatcher = require '../../dispatcher/dispatcher'

EntryServerActions =

  initializeComments: (entryId, comments, totalCount) ->
    AppDispatcher.handleServerAction
      type: Constants.entry.INITIALIZE_COMMENTS
      entryId: entryId
      comments: comments
      totalCount: totalCount

  loadComments: (entryId, comments, totalCount) ->
    AppDispatcher.handleServerAction
      type: Constants.entry.LOAD_COMMENTS
      entryId: entryId
      comments: comments
      totalCount: totalCount

  deleteComment: (entryId, commentId) ->
    AppDispatcher.handleServerAction
      type: Constants.entry.DELETE_COMMENT
      entryId: entryId
      commentId: commentId

  createComment: (entryId, comment) ->
    AppDispatcher.handleServerAction
      type: Constants.entry.CREATE_COMMENT
      entryId: entryId
      comment: comment

  editComment: (entryId, comment) ->
    AppDispatcher.handleServerAction
      type: Constants.entry.EDIT_COMMENT
      entryId: entryId
      comment: comment

module.exports = EntryServerActions