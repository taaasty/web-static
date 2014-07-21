###* @jsx React.DOM ###

window.RelationshipGuessButton = React.createClass
  mixins: [ErrorTimerMixin]

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

    xhr = $.ajax
      url: Routes.api.relationships_by_tlog_approve_url(@props.relationship.user.id)
      method: 'POST'
      success: (data) =>
        console.log 'Контакт одобрен', data
      error: (data) =>
        TastyNotifyController.errorResponse data
        @startErrorTimer()

    xhr.always =>
      @setState isProcess: false
      @props.onRequestEnd(@props.key)

  handleDisapproveClick: ->
    @setState isProcess: true

    xhr = $.ajax
      url: Routes.api.relationships_by_tlog_disapprove_url(@props.relationship.user.id)
      method: 'POST'
      success: (data) =>
        @props.onRequestEnd(@props.key)
        console.log 'Контакту отказано', data
      error: (data) =>
        TastyNotifyController.errorResponse data
        @startErrorTimer()

    xhr.always =>
      @setState isProcess: false
      @props.onRequestEnd(@props.key)