###* @jsx React.DOM ###

window.RelationshipGuessButton = React.createClass
  mixins: [ErrorTimerMixin, RequesterMixin]

  propTypes:
    relationship: React.PropTypes.object.isRequired
    onRequestEnd: React.PropTypes.func

  getInitialState: ->
    relationship:   @props.relationship
    isError:        false
    isProcess:      false

  componentWillUnmount: -> @clearErrorTimer()

  render: ->
    `<div>
      <RelationshipFollowingButton relationship={ this.props.relationship } />
      <button onClick={ this.handleDisapproveClick }
              className="button button--small button--outline-light-white button--icon">
        <i className="icon icon--cross"></i>
      </button>
    </div>`

  handleDisapproveClick: ->
    @setState isProcess: true

    @createRequest
      url: Routes.api.change_my_relationship_url(@props.relationship.user.id, 'cancel')
      method: 'POST'
      success: (data) =>
        @props.onRequestEnd(@props.key)
        console.log 'Отказались от рекомендации', data
      error: (data) =>
        TastyNotifyController.errorResponse data
        @startErrorTimer()
      complete: =>
        @safeUpdateState => @setState isProcess: false
        @props.onRequestEnd(@props.key)