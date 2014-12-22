Api                       = require '../../api/api'
NotifyController          = require '../../controllers/notify'
RelationshipServerActions = require '../server/relationship'

#TODO i18n
REPORT_SUCCESS_MESSAGE = 'Жалоба на пользователя принята, и будет рассмотрена в ближайшее время'

RelationshipViewActions =

  follow: (userId) ->
    Api.relationship.follow userId
      .then (relationship) ->
        RelationshipServerActions.updateRelationship {userId, relationship}
      .fail (xhr) =>
        NotifyController.errorResponse xhr

  unfollow: (userId) ->
    Api.relationship.unfollow userId
      .then (relationship) ->
        RelationshipServerActions.updateRelationship {userId, relationship}
      .fail (xhr) =>
        NotifyController.errorResponse xhr

  cancel: (userId) ->
    Api.relationship.cancel userId
      .then (relationship) ->
        RelationshipServerActions.updateRelationship {userId, relationship}
      .fail (xhr) =>
        NotifyController.errorResponse xhr

  ignore: (userId) ->
    Api.relationship.ignore userId
      .then (relationship) ->
        RelationshipServerActions.updateRelationship {userId, relationship}
      .fail (xhr) =>
        NotifyController.errorResponse xhr

  report: (userId) ->
    Api.relationship.report userId
      .then ->
        NotifyController.notifySuccess REPORT_SUCCESS_MESSAGE
      .fail (xhr) =>
        NotifyController.errorResponse xhr

module.exports = RelationshipViewActions