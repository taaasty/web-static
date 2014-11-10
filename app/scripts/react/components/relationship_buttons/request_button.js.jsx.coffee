###* @jsx React.DOM ###

#TODO: i18n
ERROR   = 'ошибка'
LOADING = 'в процессе..'
APPROVE = 'одобрить'

ERROR_STATE   = 'error'
LOADING_STATE = 'loading'
WAITING_STATE = 'waiting'

window.RelationshipRequestButton = React.createClass
  mixins: ['RelationshipMixin']

  propTypes:
    relationship: React.PropTypes.object.isRequired

  getInitialState: ->
    currentState: WAITING_STATE
    isError:   false
    isProcess: false

  render: ->
    title = @_getTitle()

    return `<div>
              <button
                  className="button button--small button--outline-light-white"
                  onClick={ this.handleApproveClick }>
                { title }
              </button>
              <button
                  className="button button--small button--outline-light-white button--icon"
                  onClick={ this.handleDisapproveClick }>
               <i className="icon icon--cross" />
              </button>
            </div>`

  activateLoadingState: -> @safeUpdateState(currentState: LOADING_STATE)
  activateWaitingState: -> @safeUpdateState(currentState: WAITING_STATE)

  _getTitle: ->
    switch @state.currentState
      when ERROR_STATE   then ERROR
      when LOADING_STATE then LOADING
      else APPROVE

  handleApproveClick: ->
    @approve
      success: (relationship) =>
        RelationshipsDispatcher.handleServerAction {
          type: 'requestedRelationshipApproved'
          relationship: relationship
        }

  handleDisapproveClick: ->
    @disapprove
      success: (relationship) =>
        RelationshipsDispatcher.handleServerAction {
          type: 'requestedRelationshipDisapproved'
          relationship: relationship
        }