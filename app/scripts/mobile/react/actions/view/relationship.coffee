Api                       = require '../../api/api'
NotifyController          = require '../../controllers/notify'
RelationshipServerActions = require '../server/relationship'

#TODO i18n
REPORT_SUCCESS_MESSAGE = 'Жалоба на пользователя принята, и будет рассмотрена в ближайшее время'

RelationshipViewActions =

  follow: (userId) ->
    Api.follow userId
      .then (relationship) ->
        RelationshipServerActions.updateRelationship {userId, relationship}
      .fail (xhr) =>
        NotifyController.errorResponse xhr

  unfollow: (userId) ->
    Api.unfollow userId
      .then (relationship) ->
        RelationshipServerActions.updateRelationship {userId, relationship}
      .fail (xhr) =>
        NotifyController.errorResponse xhr

  cancel: (userId) ->
    Api.cancel userId
      .then (relationship) ->
        RelationshipServerActions.updateRelationship {userId, relationship}
      .fail (xhr) =>
        NotifyController.errorResponse xhr

  ignore: (userId) ->
    Api.ignore userId
      .then (relationship) ->
        RelationshipServerActions.updateRelationship {userId, relationship}
      .fail (xhr) =>
        NotifyController.errorResponse xhr

  report: (userId) ->
    Api.report userId
      .then ->
        NotifyController.notifySuccess REPORT_SUCCESS_MESSAGE
      .fail (xhr) =>
        NotifyController.errorResponse xhr

module.exports = RelationshipViewActions