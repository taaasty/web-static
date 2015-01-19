HeroTlogActions_WriteMessageButton = React.createClass
  displayName: 'HeroTlogActions_WriteMessageButton'

  render: ->
    <button className="write-message-button"
            onClick={ @handleClick }>
      <i className="icon icon--letter" />
    </button>

  handleClick: -> 
    alert 'Ещё не работает'

module.exports = HeroTlogActions_WriteMessageButton