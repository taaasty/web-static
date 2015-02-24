{ PropTypes } = React

MessengerHeader = React.createClass
  displayName: 'MessengerHeader'

  propTypes:
    title: PropTypes.string.isRequired

  render: ->
    <div className="messages__header">
      <h3 className="messages__title">
        { @props.title }
      </h3>
    </div>

module.exports = MessengerHeader