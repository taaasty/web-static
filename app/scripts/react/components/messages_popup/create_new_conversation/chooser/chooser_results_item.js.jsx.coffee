###* @jsx React.DOM ###

window.MessagesPopup_ChooserResultsItem = React.createClass

  propTypes:
    predictedUser: React.PropTypes.object.isRequired
    onClick:       React.PropTypes.func.isRequired

  render: ->
   `<div className="messages__chooser-result"
         onClick={ this.handleClick }>
      <div className="messages__person">
        <div className="messages__person-avatar">
          <UserAvatar user={ this.props.predictedUser } size={ 35 } />
        </div>
        <div className="messages__person-name">{ this.props.predictedUser.slug }</div>
      </div>
    </div>`

  handleClick: (e) ->
    e.preventDefault()
    e.stopPropagation()
    @props.onClick @props.predictedUser.slug