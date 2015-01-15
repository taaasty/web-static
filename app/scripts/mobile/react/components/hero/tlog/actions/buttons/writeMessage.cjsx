HeroActions_WriteMessageButton = React.createClass
  displayName: 'HeroActions_WriteMessageButton'

  render: ->
    <button className="write-message-button"
            onClick={ @handleClick }>
      <i className="icon icon--letter" />
    </button>

  handleClick: -> 
    alert 'Ещё не работает'

module.exports = HeroActions_WriteMessageButton