Api              = require '../api/api'
Constants        = require '../constants/constants'
NotifyController = require '../controllers/notify'

#TODO: i18n
COMMENT_REPORT_SUCCESS_MESSAGE = 'Жалоба на пост успешно отправлена'
COMMENT_DELETE_SUCCESS_MESSAGE = 'Комментарий успешно удалён'

CommentsActions =

  initializeComments: (comments, totalCount) ->
    @dispatch Constants.entry.INITIALIZE_COMMENTS, {comments, totalCount}

  loadComments: (entryId, toCommentId, limit) ->
    Api.entry.loadComments entryId, toCommentId, limit
      .then (commentsInfo) =>
        comments   = commentsInfo.comments
        totalCount = commentsInfo.total_count

        @dispatch Constants.entry.LOAD_COMMENTS, {comments, totalCount}
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  createComment: (entryId, text) ->
    Api.entry.createComment entryId, text
      .then (comment) =>
        @dispatch Constants.entry.CREATE_COMMENT, {comment}
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  editComment: (entryId, commentId, text) ->
    Api.entry.editComment commentId, text
      .then (comment) =>
        @dispatch Constants.entry.EDIT_COMMENT, {comment}
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  deleteComment: (entryId, commentId) ->
    Api.entry.deleteComment commentId
      .then (response) =>
        @dispatch Constants.entry.DELETE_COMMENT, {commentId}
        NotifyController.notifySuccess COMMENT_DELETE_SUCCESS_MESSAGE
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  reportComment: (commentId) ->
    Api.entry.reportComment commentId
      .then ->
        NotifyController.notifySuccess COMMENT_REPORT_SUCCESS_MESSAGE
      .fail (xhr) ->
        NotifyController.errorResponse xhr

module.exports = CommentsActions