Api              = require '../../api/api'
NotifyController = require '../../controllers/notify'

REPORT_SUCCESS_MESSAGE = 'Жалоба на пост успешно отправлена'
DELETE_SUCCESS_MESSAGE = 'Пост успешно удалён'
VOTE_SUCCESS_MESSAGE   = 'Голос за пост отдан'

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
        NotifyController.notifySuccess REPORT_SUCCESS_MESSAGE
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  delete: (entryId) ->
    Api.entry.delete entryId
      .then ->
        NotifyController.notifySuccess DELETE_SUCCESS_MESSAGE
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  vote: (entryId) ->
    Api.entry.vote entryId
      .then (rating) ->
        NotifyController.notifySuccess VOTE_SUCCESS_MESSAGE
        rating
      .fail (xhr) ->
        NotifyController.errorResponse xhr

  loadComments: (entryId, toCommentId, limit) ->
    Api.entry.loadComments entryId, toCommentId, limit
      .fail (xhr) ->
        NotifyController.errorResponse xhr

module.exports = EntryViewActions