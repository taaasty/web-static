Constants     = require '../../constants/constants'
AppDispatcher = require '../../dispatcher/dispatcher'

RelationshipServerActions =

  updateRelationship: ({userId, relationship}) ->
    AppDispatcher.handleServerAction
      type: Constants.relationship.UPDATE_RELATIONSHIP
      userId: userId
      relationship: relationship

module.exports = RelationshipServerActions