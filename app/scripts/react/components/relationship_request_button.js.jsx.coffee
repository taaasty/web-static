###* @jsx React.DOM ###

window.RelationshipRequestButton = React.createClass
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
      <button onClick={ this.handleApproveClick }
              className="button button--small button--outline-light-white">
        { this.getTitle() }
      </button>
      <button onClick={ this.handleDisapproveClick }
              className="button button--small button--outline-light-white button--icon">
        <i className="icon icon--cross"></i>
      </button>
    </div>`

  getTitle: ->
    return 'ошибка'       if @state.isError
    return 'в процессе..' if @state.isProcess
    # TODO Одобрено/Одобрить по @state.relationship.state
    return 'Одобрить'

  handleApproveClick: ->
    @setState isProcess: true

    @createRequest
      url: Routes.api.relationships_by_tlog_approve_url(@props.relationship.reader.id)
      method: 'POST'
      success: (data) => console.log 'Контакт одобрен', data
      error:   (data) =>
        TastyNotifyController.errorResponse data
        @startErrorTimer()
      complete: =>
        @safeUpdateState => @setState isProcess: false
        @props.onRequestEnd(@props.key)

  handleDisapproveClick: ->
    @setState isProcess: true

    @createRequest
      url: Routes.api.relationships_by_tlog_disapprove_url(@props.relationship.reader.id)
      method: 'POST'
      success: (data) =>
        @props.onRequestEnd(@props.key)
        console.log 'Контакту отказано', data
      error: (data) =>
        TastyNotifyController.errorResponse data
        @startErrorTimer()
      complete: =>
        @safeUpdateState => @setState isProcess: false
        @props.onRequestEnd(@props.key)