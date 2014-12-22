RelationshipViewActions = require '../../../../actions/view/relationship'

RelationshipButtonMixin =

  componentWillUnmount: ->
    @clearErrorTimeout()

  clearErrorTimeout: ->
    clearTimeout @errorTimeout if @errorTimeout?

  startErrorTimeout: ->
    @activateErrorState() unless @isErrorState()
    @errorTimeout = setTimeout @activateShowState, 1000

  follow: (userId) ->
    @activateProcessState()

    RelationshipViewActions.follow userId
      .then @activateShowState
      .fail @startErrorTimeout

  unfollow: (userId) ->
    @activateProcessState()

    RelationshipViewActions.unfollow userId
      .then @activateShowState
      .fail @startErrorTimeout

  cancel: (userId) ->
    @activateProcessState()

    RelationshipViewActions.cancel userId
      .then @activateShowState
      .fail @startErrorTimeout

module.exports = RelationshipButtonMixin