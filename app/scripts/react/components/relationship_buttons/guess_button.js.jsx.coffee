###* @jsx React.DOM ###

window.RelationshipGuessButton = React.createClass
  mixins: ['RelationshipMixin']

  propTypes:
    relationship: React.PropTypes.object.isRequired
    onRequestEnd: React.PropTypes.func

  getInitialState: ->
    isError:   false
    isProcess: false

  render: ->
    `<div>
      <FollowButton relationship={ this.props.relationship } />
      <button onClick={ this.handleDisapproveClick }
              className="button button--small button--outline-light-white button--icon">
        <i className="icon icon--cross"></i>
      </button>
    </div>`

  handleDisapproveClick: ->
    @cancel( success: => @props.onRequestEnd(@props.relationship) )