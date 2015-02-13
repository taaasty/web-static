{ PropTypes } = React

NotificationsMarkButton = React.createClass
  displayName: 'NotificationsMarkButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="notifications__mark-button"
            onClick={ @handleClick }>
      Отметить как прочитанные
    </button>

  handleClick: ->
    @props.onClick()

module.exports = NotificationsMarkButton