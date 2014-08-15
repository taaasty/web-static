###* @jsx React.DOM ###

STATE_REQUESTED = 'requested'

window.RelationshipRequestButton = React.createClass
  mixins: ['RelationshipMixin']

  propTypes:
    relationship: React.PropTypes.object.isRequired
    onRequestEnd: React.PropTypes.func

  getInitialState: ->
    isError:   false
    isProcess: false

  render: ->
   `<div>
      <button onClick={ this.handleApproveClick }
              className="button button--small button--outline-light-white">
        { this._getTitle() }
      </button>
      <button onClick={ this.handleDisapproveClick }
              className="button button--small button--outline-light-white button--icon">
        <i className="icon icon--cross"></i>
      </button>
    </div>`

  isRequested: -> @props.relationship.state is STATE_REQUESTED

  handleApproveClick: ->
    @approve( success: => @props.onRequestEnd(@props.relationship) )

  handleDisapproveClick: ->
    @disapprove( success: => @props.onRequestEnd(@props.relationship) )

  _getTitle: ->
    return 'ошибка'       if @state.isError
    return 'в процессе..' if @state.isProcess

    'Одобрить' if @isRequested()