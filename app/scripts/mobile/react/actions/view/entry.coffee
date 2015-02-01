Api              = require '../../api/api'
NotifyController = require '../../controllers/notify'

EntryViewActions =

  addToFavorites: (entryId) ->
    Api.entry.addToFavorites entryId
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  removeFromFavorites: (entryId) ->
    Api.entry.removeFromFavorites entryId
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  startWatch: (entryId) ->
    Api.entry.startWatch entryId
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  stopWatch: (entryId) ->
    Api.entry.stopWatch entryId
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  report: (entryId) ->
    Api.entry.report entryId
      .then ->
        NotifyController.notifySuccess i18n.t 'messages.entry_report_success'
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  delete: (entryId) ->
    Api.entry.delete entryId
      .then ->
        NotifyController.notifySuccess i18n.t 'messages.entry_delete_success'
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  vote: (entryId) ->
    Api.entry.vote entryId
      .then (rating) ->
        NotifyController.notifySuccess i18n.t 'messages.entry_vote_success'
        rating
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  loadComments: (entryId, toCommentId, limit) ->
    Api.entry.loadComments entryId, toCommentId, limit
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  createComment: (entryId, text) ->
    Api.entry.createComment entryId, text
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  editComment: (entryId, commentId, text) ->
    Api.entry.editComment commentId, text
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  deleteComment: (entryId, commentId) ->
    Api.entry.deleteComment commentId
      .then ->
        NotifyController.notifySuccess i18n.t 'messages.comment_report_success'
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  reportComment: (commentId) ->
    Api.entry.reportComment commentId
      .then ->
        NotifyController.notifySuccess i18n.t 'messages.comment_delete_success'
      .fail (xhr) ->
        NotifyController.errorResponse xhr

module.exports = EntryViewActions